
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestSummaryCard = ({ testSummary }) => (
  <Card className="shadow-lg dark:border-0 dark:bg-zinc-900 text-center">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Summary</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 text-center">
      <div>
        <div className="flex justify-center items-center mx-auto w-24 h-24 bg-gray-200 dark:bg-zinc-700 rounded-full">
          <p className="text-2xl font-medium dark:text-white">{testSummary.totalTests}</p>
        </div>
        <p className="text-lg font-medium dark:text-white mt-2">Total Tests Taken</p>
      </div>
      <div>
        <div className="flex justify-center items-center mx-auto w-24 h-24 bg-gray-200 dark:bg-zinc-700 rounded-full">
          <p className="text-2xl font-medium dark:text-white">{testSummary.avgAccuracy}%</p>
        </div>
        <p className="text-lg font-medium dark:text-white mt-2">Average Accuracy</p>
      </div>
    </CardContent>
  </Card>
);

export default TestSummaryCard;
