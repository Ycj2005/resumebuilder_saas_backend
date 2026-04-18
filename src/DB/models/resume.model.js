import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    templateId: {
      type: String,
      required: true,
      default: "modern",
    },

    personal: {
      name: String,
      email: String,
      phone: String,
      location: String,
      headline: String, // eg: Full Stack Developer
      linkedin: String,
      github: String,
      portfolio: String,
    },

    summary: {
      type: String,
      maxLength: 1000,
    },

    skills: [
      {
        category: String, // Frontend, Backend
        items: [String], // React, Node, Mongo
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    projects: [
      {
        title: String,
        techStack: [String],
        description: String,
        link: String,
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
        year: String,
        score: String,
      },
    ],

    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],

    languages: [String],

    achievements: [String],

    pdfUrl: {
      type: String,
      default: null,
    },
    isResumeFilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
export default Resume;
