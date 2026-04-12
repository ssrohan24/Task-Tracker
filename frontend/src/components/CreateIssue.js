import React, { useState, useEffect } from "react";
import API from "../api/axios";

function CreateIssue({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


  if (!title || !project || !assignedTo) {
    alert("Fill all required fields");
    return;
  }

    try {
      await API.post("/issues", {
        title,
        description,
        project,
        assignedTo,
        priority
      });

      alert("Issue created");
      refresh();
    } catch (err) {
      alert("Error creating issue");
    }
  };

  return (
    <div>
      <h3>Create Issue</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* PROJECT */}
        <select onChange={(e) => setProject(e.target.value)}>
          <option>Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        {/* ASSIGN USER 🔥 */}
        <select onChange={(e) => setAssignedTo(e.target.value)}>
          <option>Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        {/* PRIORITY */}
        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
}

export default CreateIssue;