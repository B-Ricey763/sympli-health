import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { redirect } from "react-router";
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
} from "firebase/auth";
import { auth } from "./firebase_config";
import { ProtectedRoute } from "./protected-route";
import { NavBar } from "./nav-bar";

interface MessageResponse {
	content: string;
	is_complete: boolean;
}

// Dummy user data
const currentUser = {
	id: "1",
	name: "You",
	avatar: "/api/placeholder/32/32",
};

const botUser = {
	id: "2",
	name: "Assistant",
	avatar: "/api/placeholder/32/32",
};

// Dummy API call
const sendMessage = async (message, messages, idToken: string) => {
	// Simulate API delay
	const url = new URL("send-msg", import.meta.env.VITE_BACKEND_URL);
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${idToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			message,
			chatHistory: messages.join("\n"),
		}),
	});

	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}

	const { content, is_complete } = (await res.json()) as MessageResponse;
	if (is_complete) {
		//TODO:
		redirect(`${import.meta.env.VITE_BACKEND_URL}/chat`);
	}

	return {
		id: Date.now().toString(),
		content,
		timestamp: new Date().toISOString(),
		sender: botUser,
	};
};

const ChatMessage = ({ message, isUser }) => {
	return (
		<div className={`${isUser ? "flex-row-reverse" : ""} mb-4 flex gap-3`}>
			<Avatar className="h-8 w-8">
				<AvatarImage src={message.sender.avatar} />
				<AvatarFallback>
					{isUser ? message.sender.name[0] : <Bot />}
				</AvatarFallback>
			</Avatar>
			<div className={`${isUser ? "items-end" : ""} flex flex-col`}>
				<div
					className={`${
						isUser ? "bg-primary text-primary-foreground" : "bg-muted"
					} max-w-md rounded-lg px-4
        py-2`}
				>
					{message.content}
				</div>
				<span className="mt-1 text-xs text-muted-foreground">
					{new Date(message.timestamp).toLocaleTimeString()}
				</span>
			</div>
		</div>
	);
};

export function Chat() {
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async (e) => {
		e.preventDefault();

		if (!inputValue.trim() || isLoading) return;

		const userMessage = {
			id: Date.now().toString(),
			content: inputValue,
			timestamp: new Date().toISOString(),
			sender: currentUser,
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);

		try {
			const response = await sendMessage(
				inputValue,
				messages.map(({ id, content, timestamp, sender }) => {
					return `- ${sender?.name} at ${timestamp}: ${content}`;
				}),
				await auth.currentUser.getIdToken(),
			);
			setMessages((prev) => [...prev, response]);
		} catch (error) {
			console.error("Failed to send message:", error);
			// You might want to show an error toast here
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ProtectedRoute>
			<NavBar />
			<Card className="mx-auto my-4 flex h-[700px] w-full max-w-2xl flex-col">
				<CardContent className="flex h-full flex-col p-4">
					<ScrollArea className="flex-1 pr-4">
						<div className="space-y-4">
							{messages.map((message) => (
								<ChatMessage
									key={message.id}
									message={message}
									isUser={message.sender.id === currentUser.id}
								/>
							))}
						</div>
					</ScrollArea>

					<form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
						<Input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="Type your message..."
							disabled={isLoading}
							className="flex-1"
						/>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Sending..." : "Send"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</ProtectedRoute>
	);
}
