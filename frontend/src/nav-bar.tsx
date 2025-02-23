import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { auth } from "./firebase_config";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export function NavBar() {
	const location = useLocation();
	const isLoggedIn = auth.currentUser !== null;
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		// 2. Set up the subscription
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user); // Will be null if logged out, user object if logged in
		});

		// 3. Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	const getLinkClass = (path: string) => {
		// underlines the current link
		return location.pathname === path ? "border-b-2 border-[#7870FF] pb-1" : "";
	};

	const getUserInitials = (user) => {
		if (!user) return "";
		const nameParts = user.displayName?.split(" ") || [];
		const initials = nameParts.map((part) => part[0]).join("");
		return initials || user.email[0];
	};

	const onLogout = async () => {
		try {
			await auth.signOut();
			navigate("/login");
			console.log("User successfully logged out");
			// You can add additional cleanup here if needed
			// For example: clear local storage, reset state, redirect user
		} catch (error) {
			console.error("Error logging out:", error.message);
			throw error; // Re-throw to handle in the component
		}
	};

	const NavLinks = ({ className = "", onClick = () => {} }) => (
		<div className={className}>
			<Link
				to="/landing"
				className={getLinkClass("/landing")}
				onClick={onClick}
			>
				About Us
			</Link>
			<Link
				to="/dashboard"
				className={getLinkClass("/dashboard")}
				onClick={onClick}
			>
				Dashboard
			</Link>
			<Link to="/chat" className={getLinkClass("/chat")} onClick={onClick}>
				Chat
			</Link>
		</div>
	);

	return (
		<nav className="border-b bg-background">
			<div className="flex items-center justify-between px-4 py-3 md:px-10">
				{/* Logo */}
				<div className="font-bold">
                <Link to="/landing">
                    <h1 className="font-['PT_Sans_Narrow'] text-2xl hover:text-[#7870FF] transition-colors">
                        Sympli
                    </h1>
</Link>
				</div>

				{/* Desktop Navigation */}
				<NavLinks className="hidden space-x-10 md:flex" />

				{/* Desktop Login Button */}
				<div className="hidden items-center space-x-4 md:flex">
					{/* Show either Login button or Avatar based on auth state */}
					{isLoggedIn ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full"
								>
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={user?.photoURL || ""}
											alt={user?.displayName || "User"}
										/>
										<AvatarFallback>{getUserInitials(user)}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={onLogout}
									className="hover:bg-[#7870FF]/10 focus:bg-[#7870FF]/10"
								>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link to="/login">
							<Button className="rounded-xl bg-[#7870FF] px-12 py-6 text-xl shadow-xl shadow-[#7870FF]/60 transition-all duration-300 hover:scale-105 hover:bg-[#7870FF]/90 hover:shadow-2xl hover:shadow-[#7870FF]/70">
								Login
							</Button>
						</Link>
					)}
				</div>

				{/* Mobile Menu */}
				<Sheet>
					<SheetTrigger asChild className="md:hidden">
						<Button variant="ghost" size="icon">
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[300px] sm:w-[400px]">
						<div className="mt-8 flex flex-col space-y-4">
							<NavLinks className="flex flex-col space-y-4" />
							{isLoggedIn ? (
								<Button
									variant="destructive"
									className="w-full"
									onClick={() => {
										onLogout();
									}}
								>
									<LogOut className="mr-2 h-4 w-4" />
									Log out
								</Button>
							) : (
								<Link to="/login">
									<Button
										className="w-full rounded-xl bg-[#7870FF] px-12 py-6 text-xl shadow-xl shadow-[#7870FF]/60 transition-all duration-300 hover:scale-105 hover:bg-[#7870FF]/90 hover:shadow-2xl hover:shadow-[#7870FF]/70"
										variant="default"
									>
										Login
									</Button>
								</Link>
							)}
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	);
}

const ResponsiveNav = ({ Link }) => {
	const getLinkClass = (path) => {
		const baseClass = "transition-colors hover:text-primary";
		return window.location.pathname === path
			? `${baseClass} text-primary font-medium`
			: baseClass;
	};
};

export default ResponsiveNav;
