import { Request, Response } from "@google-cloud/functions-framework";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import prompt from "../prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash",
	systemInstruction: "be a bot",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
};

interface MessageRequest {
	message: string;
}

export async function HandleMessage(req: Request, res: Response) {
	const { message } = req.body as MessageRequest;
	if (!message || message.trim().length === 0) {
		res.status(400).json({
			error: "Message cannot be empty",
		});
		return;
	}

	const chatSession = model.startChat({
		generationConfig,
		history: [
			{
				role: "user",
				parts: [{ text: prompt }],
			},
		],
	});

	const messageResult = await chatSession.sendMessage(message);

	res.status(200).json({
		content: messageResult.response.text(),
	});
}
