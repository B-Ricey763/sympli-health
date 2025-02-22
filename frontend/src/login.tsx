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
		<>
			{/* Login Container */}
			<div className="flex flex-col gap-4 max-w-md mx-auto w-full p-4">
				<div>
					{/* Header */}
					<Link to="/"> Go to home! </Link>
					Hello world, this is login!
				</div>
				{/* Login Form */}
				<div className="flex flex-col gap-3">
					<input type="text" placeholder="Username" className="max-w-xs" />
					<input type="password" placeholder="Password" className="max-w-xs" />
					<button className="max-w-xs">Login</button>
				</div>
			</div>
		<div>
			<Button onClick={() => getHealth()}>Get Health</Button>
			<Link to="/">Go to home!</Link>
			Hello world, this is login!
			<p>Health: {JSON.stringify(health)}</p>
			MORE STUFF: {JSON.stringify(import.meta.env)}
		</div>
		</>

	);
}
