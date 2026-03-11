import Resume from "../DB/models/resume.model.js";

export const createOrUpdateResume = async (req, res) => {
  const userId = req.user._id;
  const resumeData = req.body;
  try {
    const resume = await Resume.findOneAndUpdate(
      { userId: req.user._id },
      { ...resumeData, userId },
      { upsert: true, new: true },
    );
    if (!resume) {
      res.json({
        msg: "resume not saved",
        status: 500,
      });
    }
    res.json({ msg: "Resume saved", resume, status: 200 });
  } catch (error) {
    res.json({
      msg: "resumedata not update",
      status: 500,
    });
  }
};

export const getMyResume = async (req, res) => {
  const resume = await Resume.findOne({ userId: req.user._id }).populate('userId').exec();

  if (!resume) {
    return res.status(404).json({ msg: "Resume not found", status: 404 });
  }

  return res.status(200).json({ msg: "Resume found", resumedata: resume, status: 404 });
};