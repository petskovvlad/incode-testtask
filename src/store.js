import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import issuesReducer from "./redux/issues.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  issuesReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
