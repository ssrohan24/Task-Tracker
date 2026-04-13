import React, { useState } from "react";
import API from "../api/axios";

function ProjectCard({ project, refresh, user }) {

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [startDate, setStartDate] = useState(project.startDate?.split("T")[0] || "");
  const [endDate, setEndDate] = useState(project.endDate?.split("T")[0] || "");

  // 🗑 DELETE
  const deleteProject = async () => {
    try {
      await API.delete(`/projects/${project._id}`);
      alert("Deleted");
      refresh();
    } catch (error) {
      alert(error.response?.data?.msg || "Error deleting");
    }
  };

  // ✏️ UPDATE
  const updateProject = async () => {
    try {
      await API.put(`/projects/${project._id}`, {
        name,
        description,
        startDate,
        endDate
      });

      alert("Updated");
      setIsEditing(false);
      refresh();
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="card">

      {/* 👀 VIEW MODE */}
      {!isEditing ? (
        <>
          <h3>{project.name}</h3>
          <p>{project.description}</p>

          <p><b>Start:</b> {project.startDate?.split("T")[0]}</p>
          <p><b>End:</b> {project.endDate?.split("T")[0]}</p>

          <p>
            <strong>Members:</strong>{" "}
            {project.members?.length > 0
              ? project.members.map(m => m.name).join(", ")
              : "No members assigned"}
          </p>

          {user?.role === "admin" && (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={deleteProject}>Delete</button>
            </>
          )}
        </>
      ) : (

        /* ✏️ EDIT MODE */
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={updateProject}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}

    </div>
  );
}

export default ProjectCard;