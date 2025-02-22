import { Request, Response } from "@google-cloud/functions-framework";
// import { DecodedIdToken } from "firebase-admin/auth";

type DecodedIdToken = {};

export async function handleUsers(req: Request, res: Response, user: any) {
	switch (req.method) {
		case "GET":
			return getUsers(req, res, user);
		case "POST":
			return createUser(req, res, user);
		default:
			res.status(405).json({ error: "Method not allowed" });
	}
}

async function getUsers(req: Request, res: Response, user: DecodedIdToken) {
	// Implementation
	res.json({ users: [] });
}

async function createUser(req: Request, res: Response, user: DecodedIdToken) {
	// Implementation
	res.json({ success: true });
}
