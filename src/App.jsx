import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import IssuesList from "./components/issuesList/IssuesList";
import SearchInput from "./components/searchInput/SearchInput";
import PropTypes from "prop-types";
import store from "./store";

const App = () => {
  const [isInitialRender, setIsInitialRender] = useState(false);
  console.log(isInitialRender);

  useEffect(() => {
    const issuesDataInLocalStorage = JSON.parse(
      localStorage.getItem("issuesData")
    );
    const reposDataInLocalStorage = JSON.parse(
      localStorage.getItem("reposData")
    );

    if (
      (!issuesDataInLocalStorage || issuesDataInLocalStorage.length === 0) &&
      (!reposDataInLocalStorage || reposDataInLocalStorage.length === 0)
    ) {
      setIsInitialRender(false);
    } else {
      setIsInitialRender(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <SearchInput
        setIsInitialRender={setIsInitialRender}
        isInitialRender={isInitialRender}
      />
      {isInitialRender && <IssuesList />}
    </Provider>
  );
};

App.propTypes = {
  setIsInitialRender: PropTypes.func,
  isInitialRender: PropTypes.bool,
};

export default App;
