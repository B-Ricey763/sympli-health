#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

async function compileMarkdownToTypeScript(
	inputPath: string,
	outputPath: string,
) {
	try {
		// Read the markdown file
		const markdownContent = await fs.readFile(inputPath, "utf-8");

		// Escape special characters
		const escapedContent = markdownContent
			.replace(/\\/g, "\\\\") // Escape backslashes
			.replace(/`/g, "\\`") // Escape backticks
			.replace(/\$/g, "\\$") // Escape dollar signs
			.replace(/\r\n/g, "\n") // Normalize line endings
			.trim(); // Remove trailing whitespace

		// Create TypeScript content
		const tsContent = `// Generated from ${path.basename(inputPath)}
// This file is auto-generated. Do not edit directly.

const prompt = \`${escapedContent}\`;

export default prompt;
`;

		// Ensure output directory exists
		const outputDir = path.dirname(outputPath);
		await fs.mkdir(outputDir, { recursive: true });

		// Write the TypeScript file
		await fs.writeFile(outputPath, tsContent, "utf-8");

		console.log(`Successfully compiled ${inputPath} to ${outputPath}`);
	} catch (error) {
		console.error("Error during compilation:", error);
		process.exit(1);
	}
}

// CLI handling
async function main() {
	const INPUT = path.join(__dirname, "prompts/chat-prompt.md");
	const OUTPUT = path.join(__dirname, "src/prompts.ts");

	await compileMarkdownToTypeScript(INPUT, OUTPUT);
}

// Run the script
main().catch((error) => {
	console.error("Unhandled error:", error);
	process.exit(1);
});
