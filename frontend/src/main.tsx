import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import { Login } from "./login.tsx";
import { Chat } from "./chat.tsx";
import { LandingPage } from "./landing-page.tsx";
import { NavBar } from "./nav-bar.tsx";
import { Dashboard } from "./dashboard.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/landing" element={<LandingPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
