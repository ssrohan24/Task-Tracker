const Issue = require("../models/Issue");

// CREATE ISSUE
exports.createIssue = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority } = req.body;

    const issue = await Issue.create({
      title,
      description,
      project,
      assignedTo,
      priority
    });

    res.json(issue);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET ALL ISSUES (WITH FILTER)
exports.getIssues = async (req, res) => {
  try {
    const { status, priority, project } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (project) filter.project = project;

    const issues = await Issue.find(filter)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE ISSUE
exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(issue);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE ISSUE
exports.deleteIssue = async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ msg: "Issue deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};