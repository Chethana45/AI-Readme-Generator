import axios from 'axios';
import { parseGitHubUrl } from '../utils/repoParser.js';

/**
 * Fetches repository details and file structure from the GitHub API.
 * @param {string} repoUrl - The URL of the GitHub repository.
 * @returns {object} An object containing repository details and file structure.
 * @throws {Error} If the URL is invalid or GitHub API requests fail.
 */
export const fetchRepositoryData = async (repoUrl) => {
  try {
    const { owner, repo } = parseGitHubUrl(repoUrl);

    const GITHUB_API_BASE_URL = 'https://api.github.com';
    // It is highly recommended to use a GitHub Personal Access Token for higher rate limits.
    // Store your token in a .env file as GITHUB_TOKEN.
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    // 1. Fetch repository details
    const repoDetailsResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}`,
      { headers }
    );

    const {
      name,
      description,
      language,
      stargazers_count: stars,
      default_branch,
    } = repoDetailsResponse.data;

    // 2. Fetch repository contents (file tree)
    // We need the SHA of the default branch's tree to get the full recursive tree.
    const treeResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/git/trees/${default_branch}?recursive=1`,
      { headers }
    );

    // Process the tree: filter out noise and limit size to prevent AI payload errors
    const fileStructure = treeResponse.data.tree
      .filter(item => 
        !item.path.includes('node_modules') && 
        !item.path.startsWith('.git/') &&
        item.type === 'blob'
      )
      .slice(0, 100) // Cap at 100 most relevant files
      .map((item) => ({
        path: item.path
      }));

    return {
      repoName: name,
      description,
      language,
      stars,
      fileStructure,
    };
  } catch (error) {
    console.error(`[GitHub Service Error]: ${error.message}`);
    const customError = new Error(error.response?.data?.message || 'Failed to fetch repository data from GitHub.');
    customError.statusCode = error.response?.status || 500;
    throw customError;
  }
};