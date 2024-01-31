import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  toDoIssuesListSelector,
  doneIssuesListSelector,
} from "../../redux/issues.selectors";
import IssuesInfo from "./IssueInfo";

import "./issuesList.scss";

const IssuesList = () => {
  const filteredToDoList = useSelector((state) =>
    toDoIssuesListSelector(state)
  );
  const filteredDoneList = useSelector((state) =>
    doneIssuesListSelector(state)
  );

  return (
    <div className="issues">
      <div className="issues__column">
        <h1 className="issues__column_title">ToDO</h1>
        <div className="issues__column-container">
          {filteredToDoList.map(({ id, title, body, comments, user }) => {
            return (
              <IssuesInfo
                key={id}
                id={id}
                title={title}
                body={body}
                comments={comments}
                user={user.login}
              />
            );
          })}
        </div>
      </div>
      <div className="issues__column">
        <h1 className="issues__column_title">Done</h1>
        <div className="issues__column-container">
          {filteredDoneList.map(({ id, title, body, comments, user }) => {
            return (
              <IssuesInfo
                key={id}
                id={id}
                title={title}
                body={body}
                comments={comments}
                user={user.login}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IssuesList;
