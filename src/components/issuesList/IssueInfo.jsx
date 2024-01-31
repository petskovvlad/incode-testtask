import React from "react";

const IssuesInfo = ({ title, body, comments, user }) => {
  return (
    <div className="issues__column_item">
      <h1 className="issues__column_item-title">{title}</h1>
      <p className="issues__column_item-description">{body}</p>
      <div className="issues__column_item-description">{`${user} | Comments: ${comments}`}</div>
    </div>
  );
};

export default IssuesInfo;
