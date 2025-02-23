import { Link, useLocation } from "react-router";
import { Button } from "./components/ui/button";

export function NavBar() {
    const location = useLocation();

    const getLinkClass = (path: string) => { // underlines the current link
        return location.pathname === path
            ? "border-b-2 border-[#7870FF] pb-1"
            : "";
    };

    return (
        <>
        <nav className="flex items-center justify-between py-3 px-10 shadow-md">
            <div className="text-3xl font-bold">
                <h1 className="text-2xl font-['PT_Sans_Narrow']">Sympli</h1>
            </div>
            <div className="space-x-10">
                <Link to="/landing" className={getLinkClass('/landing')}>About Us</Link>
                <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
                <Link to="/chat" className={getLinkClass('/chat')}>Chat</Link>
            </div>

            <div className="text-right">
                <Link to="/login">
                    <Button className={`login-button ${getLinkClass('/login')}`}>Login</Button>
                </Link>
            </div>
        </nav>
        </>
    )
}