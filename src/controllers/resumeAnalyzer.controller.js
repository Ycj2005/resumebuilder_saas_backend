import { PDFParse } from "pdf-parse";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No PDF file uploaded" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ success: false, message: "Invalid file type. Please upload a PDF." });
    }

    // 1. Extract text from PDF
    let pdfData;
    let parser;
    try {
      parser = new PDFParse({ data: req.file.buffer });
      pdfData = await parser.getText();
    } catch (parseError) {
      console.error("Error parsing PDF:", parseError);
      return res.status(400).json({ success: false, message: "Failed to read PDF. Ensure it's a valid text-based PDF." });
    } finally {
      if (parser) {
        try { await parser.destroy(); } catch (e) { }
      }
    }

    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({ success: false, message: "Empty or unreadable PDF content" });
    }

    // 2. Send text to Groq API
    const systemPrompt = `You are an expert AI Resume Analyzer and ATS (Applicant Tracking System) specialist.
Your task is to analyze the provided resume text and evaluate it against industry standards for software engineering and related tech roles.
Provide the output strictly as a raw JSON object with the following schema, and no extra text or markdown formatting:
{
  "ats_score": <number between 0 and 100>,
  "strengths": ["<strength 1>", "<strength 2>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "missing_keywords": ["<keyword 1>", "<keyword 2>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>"]
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Resume Text:\n${resumeText}` },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("Failed to get a response from Groq API");
    }

    // 3. Parse and return the JSON
    const parsedData = JSON.parse(responseContent);

    return res.status(200).json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Error in analyzeResume controller:", error);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred during resume analysis.",
    });
  }
};
