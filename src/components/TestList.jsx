
import React from "react";
import TestCard from "./TestCard";
import { Loader2 } from "lucide-react";

const TestList = ({ tests, handleTestClick, loading, selectedTest, onCloseDetails }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (selectedTest) {
    return (
      <div className="dark:bg-zinc-900 shadow-lg rounded-xl mx-2 sm:mx-10 p-4">
        <TestDetails test={selectedTest} onClose={onCloseDetails} />
      </div>
    );
  }

  return tests.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tests.map((test) => (
        <TestCard key={test.id} test={test} onClick={() => handleTestClick(test)} />
      ))}
    </div>
  ) : (
    <p className="text-center text-xl dark:text-white">No tests found.</p>
  );
};

export default TestList;
