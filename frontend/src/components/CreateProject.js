import React, { useState } from "react";
import API from "../api/axios";

function CreateProject({ refresh }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
  e.preventDefault();

  // 🔥 VALIDATION
  if (!name || !description) {
    alert("All fields required");
    return;
  }

  try {
    await API.post("/projects", { name, description });
    alert("Project created");

    setName("");
    setDescription("");

    refresh();
  } catch (error) {
    alert(error.response?.data?.msg || "Something went wrong");
  }
};

  return (
    <div>
      <h3>Create Project</h3>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProject;