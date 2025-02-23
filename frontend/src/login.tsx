import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase_config";
import { NavBar } from "./nav-bar";
import { onAuthStateChanged } from "firebase/auth";

export function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const from = (location.state as any)?.from?.pathname || "/";

	// Handle auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, redirect them
				navigate("/chat");
			}
		});

		return () => unsubscribe();
	}, [navigate, from]);

	const handleGoogleSignIn = async (e) => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const userData = {
				name: user.displayName,
				email: user.email,
			};
			localStorage.setItem("userData", JSON.stringify(userData));
			navigate("/dashboard");
		} catch (error) {
			console.error("Error signing in with Google: ", error);
		}
	};

	return (
		<>
			<NavBar />
			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/50 bg-white p-8 shadow-xl shadow-[#7870FF]/50 backdrop-blur-sm">
					{/* Decorative background elements */}
					<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#7870FF]/10 blur-2xl"></div>
					<div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-purple-200/30 blur-2xl"></div>

					<div className="relative mb-8 text-center">
						<h1 className="mb-3 font-['PT_Sans_Narrow'] text-5xl font-bold text-[#7870FF]">
							Welcome Back
						</h1>
						<p className="mt-2 text-lg text-gray-600">
							Sign in to continue your health journey
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-white px-4 text-base text-gray-500">
									Continue with
								</span>
							</div>
						</div>

						<button
							onClick={handleGoogleSignIn}
							className="hover:scale-102 group relative flex w-full items-center justify-center gap-3 overflow-hidden 
                                     rounded-xl border border-gray-300 px-8 py-4 
                                     text-xl shadow-lg transition-all duration-300 hover:border-[#7870FF]/30 hover:bg-gray-50
                                     hover:shadow-2xl"
						>
							<div
								className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#7870FF]/5 
                                        to-transparent transition-transform duration-500 group-hover:translate-x-[100%]"
							></div>
							<img
								src="https://www.google.com/favicon.ico"
								alt="Google"
								className="h-6 w-6"
							/>
							<span className="font-medium">Sign in with Google</span>
						</button>
					</div>

					{/* Additional decorative element */}
					<div className="mt-8 text-center">
						<p className="text-sm text-gray-500">
							By signing in, you agree to our Terms of Service
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
