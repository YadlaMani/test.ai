
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TestScoreChart = ({ loading, chartData, chartOptions }) => (
  <Card className="mb-6 shadow-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Test Scores Over Time</CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </CardContent>
  </Card>
);

export default TestScoreChart;

