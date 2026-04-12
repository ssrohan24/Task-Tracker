import React from "react";
import API from "../api/axios";

function IssueCard({ issue, refresh }) {
  const updateStatus = async (status) => {
    await API.put(`/issues/${issue._id}`, { status });
    refresh();
  };

  return (
    <div className="card">
      <h4>{issue.title}</h4>
      <p>{issue.description}</p>

      <p>Status: {issue.status}</p>
      <p>Priority: {issue.priority}</p>
      <p>Project: {issue.project?.name}</p>

      <button onClick={() => updateStatus("in-progress")}>
        In Progress
      </button>

      <button onClick={() => updateStatus("completed")}>
        Complete
      </button>
      <p>Assigned: {issue.assignedTo?.name}</p>
    </div>
  );
}

export default IssueCard;