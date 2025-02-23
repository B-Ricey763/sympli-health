import { Request, Response } from "@google-cloud/functions-framework";
import { HandleMessage } from "./handlers/messaging";
import "dotenv/config";
import { initializeApp } from "firebase-admin/app";
import { firestore } from "firebase-admin";

export const app = initializeApp();
export const db = firestore();

export async function index(req: Request, res: Response) {
	// CORS handling
	res.set("Access-Control-Allow-Origin", "*");

	if (req.method === "OPTIONS") {
		res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
		res.status(204).send("");
		return;
	}

	try {
		// Health check - keep this in main function for monitoring
		if (req.path === "/health") {
			res.json({ status: "ok", message: "you are good to go!" });
			return;
		}

		// Auth check for protected routes
		const user = await authenticateRequest(req);

		// Route to appropriate handler
		const handlers = {
			"/send-msg": HandleMessage,
		};

		const handler = handlers[req.path];
		if (handler) {
			await handler(req, res, user);
			return;
		}

		res.status(404).json({ error: "Not found" });
	} catch (error) {
		if (error.code === "UNAUTHENTICATED") {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		console.error("Error:", error);
		res.status(500).json({
			error:
				process.env.NODE_ENV === "development"
					? error.message
					: "Internal server error",
		});
	}
}
