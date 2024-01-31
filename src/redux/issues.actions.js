import { issuesData, reposData } from "../gateway/issuesGateway";

export const ISSUES_DATA_RECIEVED = "ISSUES_DATA_RECIEVED";
export const REPOS_DATA_RECIEVED = "REPOS_DATA_RECIEVED";

export const issuesDataReceived = (issuesData) => {
  return {
    type: ISSUES_DATA_RECIEVED,
    payload: issuesData,
  };
};

export const reposDataReceived = (reposData) => {
  return {
    type: REPOS_DATA_RECIEVED,
    payload: reposData,
  };
};

export const getIssuesData = (owner, repo) => {
  return function (dispatch) {
    issuesData(owner, repo).then((issuesData) =>
      dispatch(issuesDataReceived(issuesData))
    );
  };
};

export const getReposData = (owner, repo) => {
  return function (dispatch) {
    reposData(owner, repo).then((reposData) =>
      dispatch(reposDataReceived(reposData))
    );
  };
};
