import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/landing");
	});

	return <div>Loading...</div>;
}

export default App;
