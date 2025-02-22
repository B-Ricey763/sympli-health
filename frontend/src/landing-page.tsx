import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { Form } from "./components/ui/form";
import { NavBar } from "./nav-bar.tsx";

export function LandingPage() {
    return (
        <div className="min-h-screen">
            <NavBar />
            <main className="container mx-auto px-6">
                <div className="flex flex-col items-center pt-24 gap-2">
                    <div className="text-center drop-shadow-2xl">
                        <h1 className="text-7xl font-bold font-['PT_Sans_Narrow'] drop-shadow-[0_10px_10px_rgba(120,112,255,0.25)]">Sympli</h1>
                        <p className="text-2xl font-['PT_Sans_Narrow'] drop-shadow-[0_5px_5px_rgba(120,112,255,0.15)]">Your health, simplified</p>
                    </div>
                    
                    <div className="flex flex-col gap-8 mt-12 max-w-6xl">
                        <div className="text-center">
                            <h2 className="text-2xl font-['PT_Sans_Narrow'] text-[#7870FF] mb-2">Tell Your Health Story</h2>
                            <p className="text-lg">Share your symptoms and health experiences through natural conversations in our secure platform.</p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-['PT_Sans_Narrow'] text-[#7870FF] mb-2">Health Patterns</h2>
                            <p className="text-lg">Discover connections between your daily life and wellbeing through simple timeline tracking of reported symptoms.</p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-['PT_Sans_Narrow'] text-[#7870FF] mb-2">Clear Insights</h2>
                            <p className="text-lg">We transform complex health data into visual insights that both you and your healthcare team can easily understand.</p>
                        </div>
                    </div>

                    <Link to="/login">
                        <Button className="mt-12 bg-[#7870FF] hover:bg-[#7870FF]/90 shadow-xl shadow-[#7870FF]/60 text-xl px-12 py-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#7870FF]/70">Get Started</Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}