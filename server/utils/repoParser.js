/**
 * Extracts the owner and repository name from a GitHub URL.
 * @param {string} url - The GitHub repository URL.
 * @returns {{owner: string, repo: string}}
 * @throws {Error} If the URL format is invalid.
 */
export const parseGitHubUrl = (url) => {
  const regex = /github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)/;
  const match = url.match(regex);

  if (!match || match.length < 3) {
    const error = new Error(
      "Invalid GitHub repository URL format. Expected format: https://github.com/{owner}/{repo}"
    );

    error.statusCode = 400;
    throw error;
  }

  return {
    owner: match[1],
    repo: match[2],
  };
};