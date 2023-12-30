const express = require("express");
const router = express.Router();
const JobPost = require("../model/job");
const authorization = require("../middleware/authorization");

router.post("/jobposts", authorization, async (req, res) => {
  const {
    companyName,
    logoURL,
    position,
    salary,
    jobType,
    remote,
    location,
    description,
    skills,
    about,
  } = req.body;

  const recruiterName = req.body.name;
  let skillsArray = skills;
  if (typeof skills === "string") {
    skillsArray = skills.split(",").map((skills) => skills.trim());
  }
  try {
    const jobPost = new JobPost({
      companyName,
      logoURL,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skillsRequired: skillsArray,
      recruiterName,
    });
    await jobPost.save();
    return res.json({
      message: "Job post created successfully",
      name: recruiterName,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Edit Job Post API
router.put("/updateJobPost", authorization, async (req, res) => {
  try {
    const {
      companyName,
      logoURL,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      skills,
      about,
    } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.jobID,
      {
        companyName,
        logoURL,
        position,
        salary,
        jobType,
        remote,
        location,
        description,
        skills,
        about,
      },
      { new: true }
    );

    await updatedJob.save();
    res
      .status(200)
      .json({ message: "Job post updated successfully", data: updatedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get job with filters API
router.get("/jobs", async (req, res) => {
  try {
    const { skills, title } = req.query;

    const query = {};
    if (skills) {
      query.skills = { $in: skills.split(",") };
    }
    if (title) {
      query.position = { $regex: new RegExp(title, "i") };
    }

    const jobs = await JobPost.find(query);

    res.status(200).json({ data: jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Detail API
router.get("/jobposts", async (req, res) => {
  const jobID = req.params.id;

  try {
    const jobPost = await jobPost.findById(jobID);

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    return res.json({ jobPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
