import { Request, Response } from "@google-cloud/functions-framework";
import { auth } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";

export async function authenticateRequest(
	req: Request,
): Promise<DecodedIdToken> {
	const token = req.headers.authorization?.split("Bearer ")[1];
	if (!token) {
		throw { code: "UNAUTHENTICATED", message: "No token provided" };
	}

	try {
		return await auth().verifyIdToken(token);
	} catch (error) {
		throw { code: "UNAUTHENTICATED", message: "Invalid token" };
	}
}
