import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


import CreateProject from "../components/CreateProject";
import ProjectCard from "../components/ProjectCard";
import CreateIssue from "../components/CreateIssue";
import IssueCard from "../components/IssueCard";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  const [issues, setIssues] = useState([]);


  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");


  const [loading, setLoading] = useState(false);


  const totalProjects = projects.length;
  const totalIssues = issues.length;

  const pending = issues.filter(i => i.status === "pending").length;
  const completed = issues.filter(i => i.status === "completed").length;





  useEffect(() => {
    fetchProjects();
    fetchIssues();
    getUser();
  }, []);



  useEffect(() => {
    fetchIssues();
  }, [statusFilter, priorityFilter, projectFilter]);



  // GET USER FROM TOKEN
  const getUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));

      console.log("DECODED USER:", decoded);

      setUser(decoded);
    } catch (error) {
      console.log("Token decode error:", error);
    }
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  const fetchIssues = async () => {
    try {
      let query = "";

      if (statusFilter) query += `status=${statusFilter}&`;
      if (priorityFilter) query += `priority=${priorityFilter}&`;
      if (projectFilter) query += `project=${projectFilter}`;

      const res = await API.get(`/issues?${query}`);
      setIssues(res.data);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      <Navbar />

      <h2>Dashboard</h2>

      {/* SHOW ROLE */}
      <p>Logged in as: {user?.role || "Unknown"}</p>

      {/* ADMIN ONLY */}
      {user?.role === "admin" && (
        <CreateProject refresh={fetchProjects} />
      )}


      <h3>Stats</h3>

      <p>Total Projects: {totalProjects}</p>
      <p>Total Issues: {totalIssues}</p>
      <p>Pending Issues: {pending}</p>
      <p>Completed Issues: {completed}</p>

      {/* PROJECT LIST */}
      {projects.map((p) => (
        <ProjectCard
          key={p._id}
          project={p}
          refresh={fetchProjects}
          user={user}
        /> 
      ))}



      {/* CREATE ISSUE */}
      <CreateIssue refresh={fetchIssues} />



      <h3>Filters</h3>

      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select onChange={(e) => setProjectFilter(e.target.value)}>
        <option value="">All Projects</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>

      <button onClick={fetchIssues}>Apply Filters</button>



      {/* ISSUE LIST */}
      <h3>Issues</h3>

      {issues.map((i) => (
        <IssueCard key={i._id} issue={i} refresh={fetchIssues} />
      ))}
    </div>
  );
}

export default Dashboard;