import { Request, Response } from "@google-cloud/functions-framework";

export function test(req: Request, res: Response) {
	res.send("Hello world!");
}
