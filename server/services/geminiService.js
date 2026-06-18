import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates a professional README.md using Gemini AI based on repository metadata and structure.
 * @param {Object} repoData - Repository information including name, description, language, and file structure.
 * @returns {Promise<string>} - The generated README content in Markdown format.
 */
export const generateReadme = async (repoData) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Act as a world-class technical writer and software documentation expert.
      Generate a professional and comprehensive README.md for a project with the following details:

      - Repository Name: ${repoData.repoName}
      - Initial Description: ${repoData.description || 'No description provided.'}
      - Primary Language: ${repoData.language}
      - GitHub Stars: ${repoData.stars}
      - Project Structure:
      ${JSON.stringify(repoData.fileStructure, null, 2)}

      The README.md must include the following sections:
      1. Project Title
      2. Description: A detailed and professional explanation of the project.
      3. Features: Key features extracted or inferred from the file structure.
      4. Installation: Clear setup instructions based on the detected tech stack.
      5. Usage: Practical examples of how to use the project.
      6. Tech Stack: A list of technologies and libraries used.
      7. Contributing: Guidelines for contributing to the repository.

      Return only the Markdown content. Avoid any meta-talk or conversational filler.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(`[Gemini Service Error]: ${error.message}`);
    throw new Error('Failed to generate README with Gemini AI');
  }
};