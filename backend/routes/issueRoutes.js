const express = require("express");
const router = express.Router();

const {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue
} = require("../controllers/issueController");

const { protect } = require("../middleware/authMiddleware");

// CREATE
router.post("/", protect, createIssue);

// GET + FILTER
router.get("/", protect, getIssues);

// UPDATE
router.put("/:id", protect, updateIssue);

// DELETE
router.delete("/:id", protect, deleteIssue);

module.exports = router;