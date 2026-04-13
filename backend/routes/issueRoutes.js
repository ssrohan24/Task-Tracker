const express = require("express");
const router = express.Router();

const {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue
} = require("../controllers/issueController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createIssue);
router.get("/", protect, getIssues);
router.put("/:id", protect, updateIssue);
router.delete("/:id", protect, deleteIssue);

module.exports = router;