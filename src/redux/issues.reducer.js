import { ISSUES_DATA_RECIEVED, REPOS_DATA_RECIEVED } from "./issues.actions";

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
    default:
      return state;
  }
};

export default issuesReducer;
