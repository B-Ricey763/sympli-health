"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// ================================

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function extractDates(symptoms: { [key: string]: string[] }) {
	// Create array of month objects for all months
	const result = MONTHS.map((monthName) => {
		const monthObj: { [key: string]: any } = { month: monthName };

		// Initialize all symptoms to 0 for this month
		Object.keys(symptoms).forEach((symptom) => {
			monthObj[symptom] = 0;
		});

		return monthObj;
	});

	// Count occurrences
	Object.entries(symptoms).forEach(([symptom, dates]) => {
		dates.forEach((dateStr) => {
			const date = new Date(dateStr);
			const monthIndex = date.getMonth();
			result[monthIndex][symptom]++;
		});
	});

	return result;
}

export function SymptomChart({ symptoms }) {
	const chartConfig: ChartConfig = Object.fromEntries(
		Object.keys(symptoms).map((symptom, index) => [
			symptom,
			{
				label: symptom.charAt(0).toUpperCase() + symptom.slice(1),
				color: `hsl(${220 + index * 40} 70% 50%)`,
			},
		]),
	);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Line Chart - Multiple</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={extractDates(symptoms)}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						{Object.keys(symptoms).map((symptom, index) => (
							<Line
								key={symptom}
								dataKey={symptom}
								type="monotone"
								stroke={chartConfig[symptom].color}
								strokeWidth={2}
								dot={true} // Enable dots
								// First line (index 0): "" means solid line (no dashes)
								// Second line (index 1): "3 2" means 3px dash, 2px gap
								strokeDasharray={index === 0 ? "" : `${index * 3} ${index * 2}`}
							/>
						))}
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							Showing total visitors for the last 6 months
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
