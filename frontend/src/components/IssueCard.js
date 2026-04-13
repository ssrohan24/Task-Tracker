import React from "react";
import API from "../api/axios";

function IssueCard({ issue, refresh, user }) {

  const updateStatus = async (status) => {
    try {
      await API.put(`/issues/${issue._id}`, { status });
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h4>{issue.title}</h4>
      <p>{issue.description}</p>

      <p>Status: {issue.status}</p>
      <p>Priority: {issue.priority}</p>
      <p>Project: {issue.project?.name}</p>
      <p>Assigned: {issue.assignedTo?.name}</p>
      <p>Due: {issue.dueDate?.split("T")[0]}</p>

      {/* 🔥 ROLE BASED BUTTONS */}
      {(user?.role === "admin" ||
        issue.assignedTo?._id === user?.id) && (
        <>
          <button onClick={() => updateStatus("in-progress")}>
            In Progress
          </button>

          <button onClick={() => updateStatus("completed")}>
            Complete
          </button>
        </>
      )}
    </div>
  );
}

export default IssueCard;