import { Component } from "./dashboard-graph.tsx";
import { NavBar } from "./nav-bar";

export function Dashboard() {
    return (
        <>
        <div className="min-h-screen">
            <NavBar />
            <Component />
            <main className="container mx-auto px-4">
            {
            }
            </main>
        </div>
        </>
    )
}