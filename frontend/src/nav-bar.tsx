import { Link, useLocation } from "react-router";
import { Button } from "./components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function NavBar() {
	const location = useLocation();

	const getLinkClass = (path: string) => {
		// underlines the current link
		return location.pathname === path ? "border-b-2 border-[#7870FF] pb-1" : "";
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
					<h1 className="font-['PT_Sans_Narrow'] text-2xl">Sympli</h1>
				</div>

				{/* Desktop Navigation */}
				<NavLinks className="hidden space-x-10 md:flex" />

				{/* Desktop Login Button */}
				<div className="hidden md:block">
					<Link to="/login">
						<Button variant="default">Login</Button>
					</Link>
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
							<NavLinks
								className="flex flex-col space-y-4"
								onClick={() =>
									document.querySelector('[role="dialog"]')?.close()
								}
							/>
							<Link
								to="/login"
								onClick={() =>
									document.querySelector('[role="dialog"]')?.close()
								}
							>
								<Button className="w-full" variant="default">
									Login
								</Button>
							</Link>
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
