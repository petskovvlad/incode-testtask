import React, { useState } from "react";
import { Provider } from "react-redux";
import IssuesList from "./components/issuesList/IssuesList";
import SearchInput from "./components/searchInput/SearchInput";
import PropTypes from 'prop-types';
import store from "./store";

const App = () => {
  const [isInitialRender, setIsInitialRender] = useState(false);

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
