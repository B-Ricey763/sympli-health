import { useNavigate } from "react-router";
import { auth } from "./firebase_config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState(auth.currentUser);

	useEffect(() => {
		// 2. Set up the subscription
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user); // Will be null if logged out, user object if logged in
		});

		// 3. Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (!user) {
			// Redirect to login page with return URL
			navigate("/login");
		}
	}, [user]);

	return <>{children}</>;
};
