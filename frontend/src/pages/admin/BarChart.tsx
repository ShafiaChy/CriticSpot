import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

const chartConfig = {
  history: {
    label: "History",
  },
  products: {
    label: "Products",
    color: "#2eb88a",
  },
  users: {
    label: "Users",
    color: "#e23670",
  },
  user: {
    label: "User",
    color: "#e88c30",
  },
  admin: {
    label: "Admin",
    color: "#af57db",
  }
} satisfies ChartConfig;

export function DashboardBarChart({chartData} : {chartData : any}) {

  const getCurrentMonthYear = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" }); // Get full month name
    const year = date.getFullYear(); // Get the full year
    return `${month} ${year}`;
  };
  return (
    <Card className="bg-white rounded-xl shadow-lg w-[500px]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Website Management Using Bar Chart</CardTitle>
        <CardDescription className="text-sm text-gray-500">{getCurrentMonthYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="history" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="history" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm text-gray-500">
        <div className="flex gap-2 font-medium leading-none text-green-600">
          Trending up by 5.2% this month
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none">Showing total history for the last 6 months</div>
      </CardFooter>
    </Card>
  );
}
