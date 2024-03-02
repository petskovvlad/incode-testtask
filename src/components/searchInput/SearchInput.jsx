import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import { reposDataSelector } from "../../redux/issues.selectors";
import { getIssuesData, getReposData } from "../../redux/issues.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import "./searchInput.scss";

const SearchInput = ({
  getIssuesData,
  getReposData,
  setIsInitialRender,
  isInitialRender,
}) => {
  const [inputValue, changeInputValue] = useState("");
  const [formData, setFormData] = useState({
    login: "",
    name: "",
    watchers: 0,
  });

  const reposData = useSelector((state) => reposDataSelector(state));
  const reposDataLocal =
    localStorage.getItem("reposData") &&
    JSON.parse(localStorage.getItem("reposData"));
  const finalReposData = reposData.length > 0 ? reposData : reposDataLocal;

  const { watchers } = finalReposData || {};

  const loadIssues = () => {
    const [login, name] = inputValue.split("/");
    getIssuesData(login, name);
    getReposData(login, name);
    setFormData({
      ...formData,
      login,
      name,
      watchers,
    });
    changeInputValue("");
    setIsInitialRender(true);
  };

  const { name, owner } = finalReposData || {};
  const { login } = owner || {};

  const formatWatchers = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed()}k`;
    }
    return value;
  };

  const openOwnerPage = () => {
    const repositoryUrl = `https://github.com/${login}`;
    window.open(repositoryUrl, "_blank");
  };

  const openRepositoryPage = () => {
    const repositoryUrl = `https://github.com/${login}/${name}`;
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
            onClick={openOwnerPage}
          >{`${login}`}</div>
          <div className="repo-input__text_url">{">"}</div>
          <div
            className="repo-input__text_url"
            onClick={openRepositoryPage}
          >{`${name}`}</div>
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

SearchInput.propTypes = {
  getIssuesData: PropTypes.func.isRequired,
  getReposData: PropTypes.func.isRequired,
  setIsInitialRender: PropTypes.func.isRequired,
  isInitialRender: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatch)(SearchInput);
