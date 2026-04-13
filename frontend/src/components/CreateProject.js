import React, { useEffect, useState } from "react";
import API from "../api/axios";

function CreateProject({ refresh }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // 🔥 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  // 🔥 HANDLE MEMBER SELECT
  const handleSelect = (e) => {
    const options = e.target.options;
    const selected = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }

    setSelectedMembers(selected);
  };

  // 🔥 CREATE PROJECT
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", {
        name,
        description,
        members: selectedMembers
      });

      alert("Project created");

      setName("");
      setDescription("");
      setSelectedMembers([]);

      refresh();
    } catch (error) {
      alert(error.response?.data?.msg || "Error");
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

        {/* 🔥 USER MULTI SELECT */}
        <select multiple onChange={handleSelect}>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProject;