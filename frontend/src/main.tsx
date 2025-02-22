import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import { Login } from "./login.tsx";
import { LandingPage } from "./landing-page.tsx";
import { NavBar } from "./nav-bar.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<Login />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/dashboard" element={<LandingPage />} />
                <Route path="/navbar" element={<NavBar />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
