import React from "react";
import { useSelector } from "react-redux";
import IssuesInfo from "./IssueInfo";
import {
  toDoIssuesListSelector,
  doneIssuesListSelector,
  actualIssuesListSelector,
} from "../../redux/issues.selectors";

import "./issuesList.scss";

const IssuesList = () => {
  const toDoList = useSelector(toDoIssuesListSelector);
  const doneList = useSelector(doneIssuesListSelector);
  const actualList = useSelector(actualIssuesListSelector);

  const localStorageData = JSON.parse(localStorage.getItem("issuesData")) || [];
  const toDoListLocal = localStorageData.filter(
    (issue) => issue.state === "open"
  );
  const doneListLocal = localStorageData.filter(
    (issue) => issue.state === "closed"
  );
  const actualListLocal = localStorageData.filter(
    (issue) => issue.state === "actual"
  );

  const renderIssues = (issues) => {
    return issues.map(({ id, title, body, comments, user, state }) => (
      <IssuesInfo
        key={id}
        id={id}
        title={title}
        body={body}
        comments={comments}
        user={user.login}
        state={state}
      />
    ));
  };

  return (
    <div className="issues">
      <div className="issues__column">
        <h1 className="issues__column_title">ToDO</h1>
        <div className="issues__column-container">
          {toDoList.length > 0
            ? renderIssues(toDoList)
            : renderIssues(toDoListLocal)}
        </div>
      </div>
      <div className="issues__column">
        <h1 className="issues__column_title">In Progress</h1>
        <div className="issues__column-container">
          {actualList.length > 0
            ? renderIssues(actualList)
            : renderIssues(actualListLocal)}
        </div>
      </div>
      <div className="issues__column">
        <h1 className="issues__column_title">Done</h1>
        <div className="issues__column-container">
          {doneList.length > 0
            ? renderIssues(doneList)
            : renderIssues(doneListLocal)}
        </div>
      </div>
    </div>
  );
};

export default IssuesList;
