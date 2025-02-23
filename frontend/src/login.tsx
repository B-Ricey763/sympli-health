import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase_config";
import { NavBar } from "./nav-bar";

export function Login() {
    const navigate = useNavigate();

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
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl shadow-[#7870FF]/50 p-8 w-full max-w-md backdrop-blur-sm border border-white/50 relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7870FF]/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-purple-200/30 rounded-full blur-2xl"></div>
                    
                    <div className="text-center mb-8 relative">
                        <h1 className="font-bold text-5xl font-['PT_Sans_Narrow'] text-[#7870FF] mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 mt-2 text-lg">
                            Sign in to continue your health journey
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 text-base">
                                    Continue with
                                </span>
                            </div>
                        </div>

                        <button 
                            onClick={handleGoogleSignIn} 
                            className="group w-full border border-gray-300 py-4 px-8 rounded-xl shadow-lg text-xl 
                                     transition-all duration-300 hover:scale-102 hover:shadow-2xl hover:bg-gray-50 
                                     flex items-center justify-center gap-3 relative overflow-hidden
                                     hover:border-[#7870FF]/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7870FF]/5 to-transparent 
                                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500">
                            </div>
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
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