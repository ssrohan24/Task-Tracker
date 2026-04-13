const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// CREATE
router.post("/", protect, adminOnly, createProject);

// GET ALL
router.get("/", protect, getProjects); 

// UPDATE
router.put("/:id", protect, adminOnly, updateProject);

// DELETE
router.delete("/:id", protect, adminOnly, deleteProject);

module.exports = router;