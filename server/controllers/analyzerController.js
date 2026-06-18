import * as githubService from '../services/githubService.js';
import * as geminiService from '../services/geminiService.js';

/**
 * Handles the request to analyze a GitHub repository and generate a README.
 */
export const analyzeRepository = async (req, res, next) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      const error = new Error('GitHub repository URL is required');
      error.statusCode = 400;
      throw error;
    }

    // 1. Fetch metadata and file structure from GitHub
    const repoContext = await githubService.fetchRepositoryData(repoUrl);

    // 2. Pass the repository context to Gemini AI to generate the README
    const readme = await geminiService.generateReadme(repoContext);

    // 3. Send the generated content back to the client
    res.status(200).json({
      success: true,
      readme
    });
  } catch (error) {
    // Forward error to the global error handler in index.js
    next(error);
  }
};