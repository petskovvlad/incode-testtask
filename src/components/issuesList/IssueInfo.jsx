import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { updateIssueState } from "../../redux/issues.actions";

const IssuesInfo = ({ title, body, comments, user, state, id }) => {
  const dispatch = useDispatch();

  const leftClick = () => {
    switch (state) {
      case "closed":
        dispatch(updateIssueState(id, "actual"));
        break;
      case "actual":
        dispatch(updateIssueState(id, "open"));
        break;
      default:
        break;
    }
  };

  const rightClick = () => {
    switch (state) {
      case "open":
        dispatch(updateIssueState(id, "actual"));
        break;
      case "actual":
        dispatch(updateIssueState(id, "closed"));
        break;
      default:
        break;
    }
  };

  return (
    <div className="issues__column_item">
      <h1 className="issues__column_item-title">{title}</h1>
      <p className="issues__column_item-description">{body}</p>
      <div className="issues__column_item-footer">{`${user} | Comments: ${comments}`}</div>
      <div className="buttons">
        {(state === "closed" || state === "actual") && (
          <button className="issues__column_item-button" onClick={leftClick}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        {(state === "open" || state === "actual") && (
          <button className="issues__column_item-button" onClick={rightClick}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default IssuesInfo;
