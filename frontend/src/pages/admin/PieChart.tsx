
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartConfig = {
    history: {
        label: "History",
    },
    orders: {
        label: "Orders",
        color: "#e23670",
    },
    pending: {
        label: "Pending",
        color: "#2eb88a",
    },
    shipping: {
        label: "Shipping",
        color: "#e88c30",
    }
} satisfies ChartConfig

export function DashboardPieChart({ chartData }: { chartData: any }) {
    const totalHistory = React.useMemo(() => {
        return chartData.reduce((acc: any, curr: any) => acc + curr.history, 0)
    }, [chartData])

    const getCurrentMonthYear = () => {
        const date = new Date();
        const month = date.toLocaleString("default", { month: "long" }); // Get full month name
        const year = date.getFullYear(); // Get the full year
        return `${month} ${year}`;
      };

    return (
        <Card className="flex flex-col w-[500px] shadow-lg">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl">Order Management Using Pie Chart</CardTitle>
                <CardDescription>{getCurrentMonthYear()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="history"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="text-3xl font-bold fill-foreground"
                                                >
                                                    {totalHistory.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    History
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total history for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
