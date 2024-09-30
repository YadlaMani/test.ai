import React from "react";
import Link from "next/link";
import { getAllTests } from "@/actions/testActions";

const CommunityPage = async () => {
  let tests = [];
  try {
    tests = await getAllTests();
  } catch (error) {
    console.error("Error fetching tests:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Tests</h1>
      {tests.length === 0 ? (
        <p>No tests available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{test.title}</h2>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Duration: {test.duration} minutes
              </p>
              <p>Questions:{test.numQuestions}</p>
              <p className="text-sm text-gray-500 mb-4">
                Difficulty: {test.difficulty}
              </p>
              <Link
                href={`/test/${test._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block"
              >
                Take Test
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
