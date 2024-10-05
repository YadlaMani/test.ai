import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TestCard = ({ test, onClick }) => {
  return (
    <Card className="hover:shadow-lg dark:bg-zinc-900  dark:border-0 transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{test.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
          Date: {new Date(test.date).toLocaleDateString()}
        </p>
        <p className="text-lg font-semibold mb-4">Score: {test.score}%</p>
        <Button onClick={onClick} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestCard;
