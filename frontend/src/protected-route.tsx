import { useNavigate } from "react-router";
import { auth } from "./firebase_config";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const user = auth.currentUser;
	const navigate = useNavigate();

	if (!user) {
		// Redirect to login page with return URL
		navigate("/login");
	}

	return <>{children}</>;
};
