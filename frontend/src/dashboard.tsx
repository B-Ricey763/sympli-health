import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { NavBar } from "./nav-bar";
import { ProtectedRoute } from "./protected-route";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase_config";
import { getDocumentFromFirestore } from "./database";

export function Dashboard() {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<User | null>();
	const [data, setData] = useState({});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const a = async () => {
			if (auth.currentUser) {
				setData(await getDocumentFromFirestore(auth.currentUser.uid));
			}
		};
		a();
	}, [user, isLoading]);

	return (
		<ProtectedRoute>
			<div className="min-h-screen">
				<NavBar />
				<main className="container mx-auto px-4">{JSON.stringify(data)}</main>
			</div>
		</ProtectedRoute>
	);
}

