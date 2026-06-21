import * as githubService from '../services/githubService.js';
import * as geminiService from '../services/geminiService.js';

/**
 * Handles the request to analyze a GitHub repository and generate a README.
 */
export const analyzeRepository = async (req, res, next) => {
  try {
    const { repoUrl } = req.body;
    console.log(`[Analyzer Controller] Received request to analyze repository: ${repoUrl}`);

    if (!repoUrl) {
      const error = new Error('GitHub repository URL is required');
      error.statusCode = 400;
      console.error('[Analyzer Controller] Error: Repository URL is missing');
      throw error;
    }

    // 1. Fetch metadata and file structure from GitHub
    console.log('[Analyzer Controller] Fetching repository data from GitHub...');
    const repoContext = await githubService.fetchRepositoryData(repoUrl);
    console.log(`[Analyzer Controller] Successfully fetched data for repo: ${repoContext.repoName}`);

    // 2. Pass the repository context to Gemini AI to generate the README
    console.log('[Analyzer Controller] Generating README with Gemini AI...');
    const readme = await geminiService.generateReadme(repoContext);
    console.log('[Analyzer Controller] README generated successfully');

    // 3. Send the generated content back to the client
    res.status(200).json({
      success: true,
      readme
    });
  } catch (error) {
    console.error('[Analyzer Controller] Error during repository analysis:', error);
    // Forward error to the global error handler in index.js
    next(error);
  }
};
