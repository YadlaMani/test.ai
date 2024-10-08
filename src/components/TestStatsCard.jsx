
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestStatsCard = ({ testStats }) => (
  <Card className="shadow-lg dark:border-0 dark:bg-zinc-900 text-center">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Test Stats</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-3 text-center">
      <div>
        <div className="flex justify-center items-center mx-auto w-24 h-24 bg-gray-200 dark:bg-zinc-700 rounded-full">
          <p className="text-2xl font-medium dark:text-white">{testStats.easy}</p>
        </div>
        <p className="text-lg font-medium dark:text-white mt-2">Easy Tests</p>
      </div>
      <div>
        <div className="flex justify-center items-center mx-auto w-24 h-24 bg-gray-200 dark:bg-zinc-700 rounded-full">
          <p className="text-2xl font-medium dark:text-white">{testStats.medium}</p>
        </div>
        <p className="text-lg font-medium dark:text-white mt-2">Medium Tests</p>
      </div>
      <div>
        <div className="flex justify-center items-center mx-auto w-24 h-24 bg-gray-200 dark:bg-zinc-700 rounded-full">
          <p className="text-2xl font-medium dark:text-white">{testStats.hard}</p>
        </div>
        <p className="text-lg font-medium dark:text-white mt-2">Hard Tests</p>
      </div>
    </CardContent>
  </Card>
);

export default TestStatsCard;
