import { createSelector } from "reselect";

const issuesDataSelector = (state) => state.issuesData || [];
export const reposDataSelector = (state) => state.reposData || [];

export const toDoIssuesListSelector = createSelector(
  issuesDataSelector,
  (issuesData) => issuesData.filter((issue) => issue.state === "open")
);

export const doneIssuesListSelector = createSelector(
  issuesDataSelector,
  (issuesData) => issuesData.filter((issue) => issue.state === "closed")
);
