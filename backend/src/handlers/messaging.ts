import { Request, Response } from "@google-cloud/functions-framework";
import {
	GenerationConfig,
	GoogleGenerativeAI,
	SchemaType,
} from "@google/generative-ai";
import "dotenv/config";
import prompt from "../prompts";
import { DecodedIdToken } from "firebase-admin/auth";
import { db } from "..";
import { firestore } from "firebase-admin";

type SymptomMap = Record<string, Symptom[]>;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash",
	systemInstruction: "be a bot",
});

const generationConfig: GenerationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
	responseSchema: {
		type: SchemaType.OBJECT,
		properties: {
			is_complete: {
				type: SchemaType.BOOLEAN,
			},
			response: {
				type: SchemaType.STRING,
			},
			symptoms: {
				type: SchemaType.ARRAY,
				items: {
					type: SchemaType.OBJECT,
					properties: {
						name: {
							type: SchemaType.STRING,
						},
						datetime: {
							type: SchemaType.STRING,
						},
						relative_time: {
							type: SchemaType.STRING,
						},
					},
					required: ["name", "datetime", "relative_time"],
				},
			},
		},
		required: ["is_complete", "response", "symptoms"],
	},
};
// 							required: ["name", "onset"]

interface MessageRequest {
	message: string;
	chatHistory: {};
}

interface Symptom {
	name: string;
	datetime: string;
	relative_time: string;
}

interface ChatResponse {
	is_complete: boolean;
	response: string;
	symptoms: [string: Symptom];
}

export async function HandleMessage(
	req: Request,
	res: Response,
	user: DecodedIdToken,
) {
	const { message, chatHistory } = req.body as MessageRequest;
	if (!message || message.trim().length === 0) {
		res.status(400).json({
			error: "Message cannot be empty",
		});
		return;
	}
	const saltedPrompt = prompt
		.replace("{{history}}", JSON.stringify(chatHistory))
		.replace("{{datetime}}", Date.now().toString());

	const chatSession = model.startChat({
		generationConfig,
		history: [
			{
				role: "user",
				parts: [{ text: saltedPrompt }],
			},
		],
	});

	const messageResult = await chatSession.sendMessage(message);
	const chatResponse = JSON.parse(
		messageResult.response.text(),
	) as ChatResponse;

	if (chatResponse.symptoms.length > 0) {
	}

	if (chatResponse.symptoms.length > 0) {
		writeSymptomsToDb(user, chatResponse.symptoms);
	}

	res.status(200).json({
		content: chatResponse.response,
		is_completed: chatResponse.is_complete,
	});
}

// TODO: test db stuff
async function writeSymptomsToDb(user: DecodedIdToken, symptoms: Symptom[]) {
	const docs = await db
		.collection("user-symptoms")
		.where("userId", "==", user.uid)
		.get();

	if (docs.empty) {
		const map = {};
		updateSymptomsMap(map, symptoms);

		const result = await db.collection("user-symptoms").add({
			userId: user.uid,
			symptoms: map,
		});
		return result;
	}

	const doc = docs.docs[0];
	const currentSymptoms = doc.data().symptoms as SymptomMap;
	updateSymptomsMap(currentSymptoms, symptoms);
	return await db.collection("user-symptoms").doc(doc.id).update({
		symptoms: currentSymptoms,
	});
}

function updateSymptomsMap(sMap: SymptomMap, newSymptoms: Symptom[]) {
	for (const s of newSymptoms) {
		if (s.name in sMap) {
			sMap[s.name].push(s);
		} else {
			sMap[s.name] = [s];
		}
	}
}
