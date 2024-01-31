const baseUrl = `https://api.github.com/repos/`;

export const issuesData = (owner, repo) => {
  return fetch(`${baseUrl}${owner}/${repo}/issues?state=all`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to load data");
      }
    }
  );
};

export const reposData = (owner, repo) => {
  return fetch(`${baseUrl}${owner}/${repo}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to load data");
    }
  });
};
