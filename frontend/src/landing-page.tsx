import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { Form } from "./components/ui/form";
import { NavBar } from "./nav-bar.tsx";

export function LandingPage() {

    return (
        <div className="min-h-screen">
            <NavBar />
            <main className="container mx-auto px-4">
                {/* Your landing page content goes here */}
            </main>
        </div>
    )
}