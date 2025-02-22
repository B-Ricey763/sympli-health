import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase_config";
import { NavBar } from "./nav-bar";


export function Login() {
	const [health, setHealth] = useState("");

	async function getHealth() {
		const url = new URL("health", import.meta.env.VITE_BACKEND_URL);
		const res = await fetch(url);
		setHealth(await res.json());
	}

	const handleGoogleSignIn = async (e) => {
		const provider = await new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	}

	return (
		<>
			{/* Login Container */}
            <NavBar />
			<div className="flex flex-col gap-4 max-w-md mx-auto w-full p-8">
				<div className="text-left">
					{/* Header */}
					<h1 className="font-bold text-2xl">Welcome!</h1>
				</div>
				{/* Login Form */}
				<div className="flex flex-col gap-3">
					<input type="text" placeholder="Username" className="max-w-xs" />
					<input type="password" placeholder="Password" className="max-w-xs" />
					<button className="max-w-xs">Login</button>
					<button onClick={handleGoogleSignIn} className="max-w-xs">Sign in with Google</button>
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
