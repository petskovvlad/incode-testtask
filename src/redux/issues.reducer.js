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
      return {
        ...state,
        issuesData: action.payload,
      };
    case REPOS_DATA_RECIEVED:
      return {
        ...state,
        reposData: action.payload,
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
      return {
        ...state,
        issuesData: updatedIssues,
      };
    default:
      return state;
  }
};

export default issuesReducer;
