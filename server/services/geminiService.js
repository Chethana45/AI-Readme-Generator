import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generates a professional README.md using Gemini AI
 */
export const generateReadme = async (repoData) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not set in environment variables"
      );
    }

    console.log("API Key Loaded:", !!apiKey);

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Act as a world-class technical writer and software documentation expert.

Generate a professional and comprehensive README.md for the following GitHub project.

Repository Name: ${repoData.repoName}

Description:
${repoData.description || "No description provided"}

Primary Language:
${repoData.language}

Stars:
${repoData.stars}

Project Structure:
${JSON.stringify(repoData.fileStructure, null, 2)}

The README must include:

# Project Title

## Description

## Features

## Installation

## Usage

## Tech Stack

## Contributing

Return ONLY markdown content.
Do not include explanations outside the README.
`;

    console.log("Calling Gemini...");

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Full Error:", error);
    console.error("==================================");

    throw new Error(
      error.message || "Failed to generate README with Gemini AI"
    );
  }
};