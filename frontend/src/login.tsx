import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase_config";
import { NavBar } from "./nav-bar";
import { onAuthStateChanged } from "firebase/auth";

export function Login() {
	const [health, setHealth] = useState("");

	const navigate = useNavigate();
	const location = useLocation();
	const from = (location.state as any)?.from?.pathname || "/";

	// Handle auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, redirect them
				navigate(from, { replace: true });
			}
		});

		return () => unsubscribe();
	}, [navigate, from]);

	async function getHealth() {
		const url = new URL("health", import.meta.env.VITE_BACKEND_URL);
		const res = await fetch(url);
		setHealth(await res.json());
	}

	const handleGoogleSignIn = async (e) => {
		const provider = await new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	return (
		<>
			<NavBar />
			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
					<div className="mb-6 text-center">
						<h1 className="font-['PT_Sans_Narrow'] text-5xl font-bold text-[#7870FF]">
							Welcome Back
						</h1>
						<p className="mt-2 text-gray-600">
							Sign in to continue your health journey
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<input
							type="text"
							placeholder="Username"
							className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#7870FF]/50"
						/>
						<input
							type="password"
							placeholder="Password"
							className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#7870FF]/50"
						/>
						<button className="mt-12 rounded-xl bg-[#7870FF] px-8 py-4 text-xl text-white shadow-xl shadow-[#7870FF]/60 transition-all duration-300 hover:scale-105 hover:bg-[#7870FF]/90 hover:shadow-2xl hover:shadow-[#7870FF]/70">
							Login
						</button>
						<div className="relative my-4">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-white px-2 text-gray-500">
									Or continue with
								</span>
							</div>
						</div>
						<button
							onClick={handleGoogleSignIn}
							className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-8 py-4 text-xl shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-2xl"
						>
							<img
								src="https://www.google.com/favicon.ico"
								alt="Google"
								className="h-5 w-5"
							/>
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
