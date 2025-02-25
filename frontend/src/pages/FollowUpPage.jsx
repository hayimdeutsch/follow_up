import React from "react";
import { useParams, useLocation } from "react-router-dom";
import FollowUpCreate from "../components/Followup/FollowupCreate";
import FollowUpEdit from "../components/Followup/FollowUpEdit";
import FollowUpView from "../components/Followup/FollowUpView";

const FollowUpPage = ({ mode }) => {
  const { id } = useParams();
  const location = useLocation();
  const student = location.state?.student;

  if (!student) {
    return <div>Student not found</div>;
  }

  switch (mode) {
    case "create":
      return <FollowUpCreate student={student}/>;
    case "edit":
      return <FollowUpEdit student={student} followupId={id} />;
    case "view":
      return <FollowUpView student={student} followupId={id} />;
    default:
      return <div>Invalid mode</div>;
  }
};

export default FollowUpPage;