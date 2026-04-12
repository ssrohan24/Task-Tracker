import React from "react";
import API from "../api/axios";

function ProjectCard({ project, refresh, user }) {

  const deleteProject = async () => {
    try {
      await API.delete(`/projects/${project._id}`);
      alert("Deleted");
      refresh();
    } catch (error) {
      alert(error.response?.data?.msg || "Error deleting");
    }
  };

  return (
    <div className="card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      {/* 🔥 ADMIN ONLY */}
      {user?.role === "admin" && (
        <button onClick={deleteProject}>Delete</button>
      )}
    </div>
  );
}

export default ProjectCard;