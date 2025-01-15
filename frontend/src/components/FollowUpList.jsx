import React from "react";
import { Link } from "react-router-dom";

const FollowUpList = ({ followUpItems }) => {
  return (
    <div>
      <h2>Follow Up Objects</h2>
      <ul>
        {followUpItems.map((followUp, index) => (
          <li key={index}>
            {followUp.title}
            <Link to={`/teacher/followup/${followUp.token}`}>
              View Follow-Up
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUpList;
