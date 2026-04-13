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

//   console.log("PROJECT:", project);
// console.log("MEMBERS:", project.members);

  return (
    <div className="card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>


      <div>
        
        <p>
          <strong>Members:</strong>{" "}
          {project.members && project.members.length > 0
            ? project.members.map((m) => m.name || m.email).join(", ")
            : "No members assigned"}
        </p>
      </div>

      {/* 🔥 ADMIN ONLY */}
      {user?.role === "admin" && (
        <button onClick={deleteProject}>Delete</button>
      )}
    </div>
  );
}

export default ProjectCard;