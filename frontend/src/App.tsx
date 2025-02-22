import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function App() {
	const [count, setCount] = useState(0);

	async function getHealth() {
		const res = await fetch(
			"https://index-router-57685090875.us-east1.run.app/health",
		);
		console.log(await res.json());
	}

	return (
		<>
			<Button asChild>
				<Link to="/login">Login</Link>
			</Button>
		</>
	);
}

export default App;
