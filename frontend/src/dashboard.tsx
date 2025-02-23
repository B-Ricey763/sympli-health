import { SymptomChart } from "./dashboard-graph.tsx";
import { NavBar } from "./nav-bar";
import { ProtectedRoute } from "./protected-route";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase_config";
import { getDocumentFromFirestore } from "./database";

interface SymptomEntry {
	name: string;
	datetime: string;
	relative_time: string;
}

interface SymptomsByName {
	[key: string]: SymptomEntry[];
}

interface SimplifiedSymptoms {
	[key: string]: string[];
}

function transformSymptoms(symptoms: SymptomsByName): SimplifiedSymptoms {
	if (!symptoms) {
		return {};
	}
	const result: SimplifiedSymptoms = {};

	// Iterate through each symptom category
	Object.entries(symptoms).forEach(([symptomName, entries]) => {
		// Extract just the timestamps for this symptom
		result[symptomName] = entries.map((entry) => entry.datetime);
	});

	return result;
}

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

	let exists = false;
	let symptoms;
	if (data && data.symptoms) {
		symptoms = transformSymptoms(data.symptoms);
		exists = Object.keys(symptoms).length !== 0;
	}

	return (
		<ProtectedRoute>
			<div className="min-h-screen">
				<NavBar />
				{exists ? <SymptomChart symptoms={symptoms} /> : "Loading..."}
			</div>
		</ProtectedRoute>
	);
}
