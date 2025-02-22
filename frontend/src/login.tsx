import { Link } from "react-router";

export function Login() {
	return (
		<>
			{/* Login Container */}
			<div className="flex flex-col gap-4 max-w-md mx-auto w-full p-4">
				<div>
					{/* Header */}
					<Link to="/"> Go to home! </Link>
					Hello world, this is login!
				</div>
				{/* Login Form */}
				<div className="flex flex-col gap-3">
					<input type="text" placeholder="Username" className="max-w-xs" />
					<input type="password" placeholder="Password" className="max-w-xs" />
					<button className="max-w-xs">Login</button>
				</div>
			</div>
		</>
	);
}
