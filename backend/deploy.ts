import * as dotenv from "dotenv";
import fs from "fs";
import { execSync } from "child_process";

// Load environment variables
dotenv.config();

interface DeployConfig {
	serviceName: string;
	functionName: string;
	baseImage: string;
	region: string;
	project: string;
	isPublic: boolean;
}

const config: DeployConfig = {
	serviceName: "index-router",
	functionName: "index",
	baseImage: "nodejs20",
	region: "us-east1",
	project: "sympli-health",
	isPublic: true,
};

const getEnvVarsFromFile = (): string => {
	// Read .env file directly
	const envFile = fs.readFileSync(".env", "utf-8");

	// Parse the .env file content and convert to comma-separated string
	return envFile
		.split("\n")
		.filter((line) => line && !line.startsWith("#")) // Remove empty lines and comments
		.map((line) => line.trim())
		.join(",");
};

const buildDeployCommand = (config: DeployConfig, envVars: string): string => {
	return `gcloud run deploy ${config.serviceName} \
    --source . \
    --function ${config.functionName} \
    --base-image ${config.baseImage} \
    --region ${config.region} \
    ${config.isPublic ? "--allow-unauthenticated" : ""} \
    --project=${config.project} \
    --set-env-vars "${envVars}"`;
};

const deploy = (): void => {
	try {
		console.log("Starting deployment...");
		const envVars = getEnvVarsFromFile();
		const command = buildDeployCommand(config, envVars);

		console.log("Executing command:", command);
		execSync(command, { stdio: "inherit" });

		console.log("Deployment successful!");
	} catch (error) {
		console.error("Deployment failed:", error);
		process.exit(1);
	}
};

deploy();
