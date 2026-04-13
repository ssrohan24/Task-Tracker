const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status, members } = req.body;

    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
      status,
      members,
      createdBy: req.user.id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET ALL PROJECTS
const getProjects = async (req, res) => {
  try {
    let query = {};

    // 🔥 MEMBER → only projects they are part of
    if (req.user.role !== "admin") {
      query.members = req.user.id;
    }

    const projects = await Project.find(query)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// EXPORT
module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};