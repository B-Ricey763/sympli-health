import { SymptomChart } from "./dashboard-graph.tsx";
import { NavBar } from "./nav-bar";
import { ProtectedRoute } from "./protected-route";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase_config";
import { getDocumentFromFirestore } from "./database";
import { Link } from "react-router";
import { Button } from "./components/ui/button.tsx";
import { LoaderIcon } from "lucide-react";

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
			<NavBar />
			<div className="mx-auto w-full py-10 text-center md:w-3/4">
				{exists ? (
					<SymptomChart symptoms={symptoms} />
				) : (
					<>
						<div className="flex items-center justify-center">
							<LoaderIcon className="animate-spin" />
						</div>

                        <div className="max-w-xxl mx-auto">
                            <p className="py-4">
                            Click below to begin logging your symptoms and see your health insights dashboard.
                            </p>
                        </div>
						<Link to="/login">
							<Button className="rounded-xl bg-[#7870FF] px-12 py-6 text-xl shadow-xl shadow-[#7870FF]/60 transition-all duration-300 hover:scale-105 hover:bg-[#7870FF]/90 hover:shadow-2xl hover:shadow-[#7870FF]/70">
								Start Chatting
							</Button>
						</Link>
					</>
				)}
			</div>
		</ProtectedRoute>
	);
}
