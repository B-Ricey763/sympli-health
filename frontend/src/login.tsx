import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { useState } from "react";

export function Login() {
	const [health, setHealth] = useState("");

	async function getHealth() {
		const url = new URL("health", import.meta.env.VITE_BACKEND_URL);
		const res = await fetch(url);
		setHealth(await res.json());
	}
	return (
		<div>
			<Button onClick={() => getHealth()}>Get Health</Button>
			<Link to="/">Go to home!</Link>
			Hello world, this is login!
			<p>Health: {JSON.stringify(health)}</p>
			MORE STUFF: {JSON.stringify(import.meta.env)}
		</div>
	);
}
