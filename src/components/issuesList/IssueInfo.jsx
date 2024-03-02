import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  issuesDataReceived,
  reposDataReceived,
  updateIssueState,
} from "../../redux/issues.actions";
import PropTypes from "prop-types";

const IssuesInfo = ({ title, body, comments, user, state, id }) => {
  const dispatch = useDispatch();

  const useLocalStorage = (key, defaultValue) => {
    const storedValue = JSON.parse(localStorage.getItem(key)) || defaultValue;
    return storedValue;
  };

  const issueStorageData = useLocalStorage("issuesData", []);
  const reposStorageData = useLocalStorage("reposData", []);

  const handleStateChange = async (newState) => {
    await dispatch(issuesDataReceived(issueStorageData));
    await dispatch(reposDataReceived(reposStorageData));
    await dispatch(updateIssueState(id, newState));
  };

  const leftClick = async () => {
    switch (state) {
      case "closed":
        await handleStateChange("actual");
        break;
      case "actual":
        await handleStateChange("open");
        break;
      default:
        break;
    }
  };

  const rightClick = async () => {
    switch (state) {
      case "open":
        await handleStateChange("actual");
        break;
      case "actual":
        await handleStateChange("closed");
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

IssuesInfo.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  comments: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["open", "actual", "closed"]).isRequired,
  id: PropTypes.number.isRequired,
};

export default IssuesInfo;
