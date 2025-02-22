import { Twilio } from "twilio";

export async function SendSMSMessage() {
	const accountSid = process.env.TWILIO_ACCOUNT_SID;
	const authToken = process.env.TWILIO_AUTH_TOKEN;
	const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
	const myNumber = process.env.MY_NUMBER;

	const client = new Twilio();
	const msg = await client.messages.create({
		body: "Hello from Twilio asdf",
		from: "+18559233503",
		to: "+18777804236",
	});
}
