import React, { useState } from "react";
import { Provider } from "react-redux";
import IssuesList from "./components/issuesList/IssuesList";
import SearchInput from "./components/searchInput/SearchInput";
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

export default App;
