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
			<NavBar />
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
					<div className="text-center mb-6">
						<h1 className="font-bold text-5xl font-['PT_Sans_Narrow'] text-[#7870FF]">Welcome Back</h1>
						<p className="text-gray-600 mt-2">Sign in to continue your health journey</p>
					</div>
					<div className="flex flex-col gap-4">
						<input 
							type="text" 
							placeholder="Username" 
							className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7870FF]/50"
						/>
						<input 
							type="password" 
							placeholder="Password" 
							className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7870FF]/50"
						/>
						<button className="mt-12 bg-[#7870FF] hover:bg-[#7870FF]/90 shadow-xl shadow-[#7870FF]/60 text-xl px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#7870FF]/70 text-white">
							Login
						</button>
						<div className="relative my-4">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or continue with</span>
							</div>
						</div>
						<button 
							onClick={handleGoogleSignIn} 
							className="w-full border border-gray-300 py-4 px-8 rounded-xl shadow-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50 flex items-center justify-center gap-2"
						>
							<img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		{/* <div>
			<Button onClick={() => getHealth()}>Get Health</Button>
			<Link to="/">Go to home!</Link>
			Hello world, this is login!
			<p>Health: {JSON.stringify(health)}</p>
			MORE STUFF: {JSON.stringify(import.meta.env)}
		</div> */}
		</>



	);
}
