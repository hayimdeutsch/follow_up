import React from "react";

const DummyPage = ({ user }) => {
  return (
    <div>
      <h1>Welcome to the Dummy Page, {user}!</h1>
      <p>You are successfully signed in!</p>
    </div>
  );
};

export default DummyPage;
