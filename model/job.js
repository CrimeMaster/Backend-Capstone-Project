const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  remote: {
    type: String,
    enum: ["Remote", "office"],
    required: true,
  },
  skillsRequired: {
    type: String,
    required: true,
  },
  recuiterName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.new,
  },
  logoURL: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Intern"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    
    required: true,
  },
});

module.exports = mongoose.model("JobPost", jobPostSchema);
