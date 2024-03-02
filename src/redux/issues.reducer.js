import {
  ISSUES_DATA_RECIEVED,
  REPOS_DATA_RECIEVED,
  UPDATE_ISSUE_STATE,
} from "./issues.actions";

const initialState = {
  issuesData: [],
  reposData: [],
};

const issuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISSUES_DATA_RECIEVED:
      localStorage.setItem("issuesData", JSON.stringify(action.payload));
      return {
        ...state,
        issuesData:
          state.issuesData.length === 0 ? action.payload : state.issuesData,
      };
    case REPOS_DATA_RECIEVED:
      localStorage.setItem("reposData", JSON.stringify(action.payload));
      return {
        ...state,
        reposData:
          state.reposData.length === 0 ? action.payload : state.reposData,
      };
    case UPDATE_ISSUE_STATE:
      const { id } = action.payload;
      const updatedIssues = state.issuesData.map((issue) => {
        if (issue.id === id) {
          return {
            ...issue,
            state: action.payload.state,
          };
        }
        return issue;
      });
      localStorage.setItem("issuesData", JSON.stringify(updatedIssues));
      return {
        ...state,
        issuesData: updatedIssues,
      };
    default:
      return state;
  }
};

export default issuesReducer;
