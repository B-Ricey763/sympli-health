import { Link } from "react-router";
import { Button } from "./components/ui/button";

export function NavBar() {
    return (
        <>
        <nav className="flex items-center justify-between py-3 px-10 shadow-md">
            <div className="text-3xl font-bold">
                <h1 className="text-2xl font-['PT_Sans_Narrow']">Sympli</h1>
            </div>
            <div className="space-x-10">
                <Link to="/landing">About Us</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/chat">Chat</Link>
            </div>

            <div className="text-right">
                <Link to="/login">
                    <Button className="login-button">Login</Button>
                </Link>
            </div>
        </nav>
        </>
    )
}