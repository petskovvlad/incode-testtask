import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import { reposDataSelector } from "../../redux/issues.selectors";
import { getIssuesData, getReposData } from "../../redux/issues.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./searchInput.scss";

const SearchInput = ({
  getIssuesData,
  getReposData,
  setIsInitialRender,
  isInitialRender,
}) => {
  const [inputValue, changeInputValue] = useState("");
  const [formData, setFormData] = useState({
    owner: "",
    repo: "",
    watchers: 0,
  });

  const reposData = useSelector((state) => reposDataSelector(state));
  const { watchers } = reposData || {};

  const loadIssues = () => {
    const [owner, repo] = inputValue.split("/");
    getIssuesData(owner, repo);
    getReposData(owner, repo);
    setFormData({
      ...formData,
      owner,
      repo,
      watchers,
    });
    changeInputValue("");
    setIsInitialRender(true);
  };

  const { owner, repo } = formData;

  const formatWatchers = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed()}k`;
    }
    return value;
  };

  const openRepositoryPage = () => {
    const repositoryUrl = `https://github.com/${owner}/${repo}`;
    window.open(repositoryUrl, "_blank");
  };

  return (
    <header className="header">
      <div className="repo-input__input-block search-block">
        <input
          type="text"
          name="repo-name"
          className="search-block__input"
          value={inputValue}
          onChange={(e) => changeInputValue(e.target.value)}
        ></input>
        <button className="search-block__button" onClick={loadIssues}>
          Load issues
        </button>
      </div>
      {isInitialRender && (
        <div className="repo-input">
          <div
            className="repo-input__text_url"
            onClick={openRepositoryPage}
          >{`${owner} > ${repo}`}</div>
          <div className="repo-input__container">
            <FontAwesomeIcon icon={faStar} className="repo-input__text_img" />
            <div className="repo-input__text_stars">{`${
              formatWatchers(watchers) || 0
            } stars`}</div>
          </div>
        </div>
      )}
    </header>
  );
};

const mapDispatch = {
  getIssuesData,
  getReposData,
};

export default connect(null, mapDispatch)(SearchInput);
