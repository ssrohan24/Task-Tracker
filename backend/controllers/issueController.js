const Issue = require("../models/Issue");

// CREATE
const createIssue = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate } = req.body;

    const issue = await Issue.create({
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate
    });

    res.json(issue);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET
const getIssues = async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.assignedTo = req.user.id;
    }

    const issues = await Issue.find(query)
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE (SECURE)
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ msg: "Issue not found" });
    }

    if (
      req.user.role !== "admin" &&
      issue.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed to update this issue" });
    }

    const updated = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE
const deleteIssue = async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ msg: "Issue deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue
};