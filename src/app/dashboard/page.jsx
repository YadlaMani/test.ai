"use client";
import React, { useState, useEffect } from "react";
import {
  getUserTests,
  getTestResult,
  getTestStats,
} from "../../actions/testActions";
import TestCard from "../../components/TestCard";
import TestDetails from "../../components/TestDetails";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { getUserDetails } from "@/actions";

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState(null);
  const [testSummary, setTestSummary] = useState({
    totalTests: 0,
    avgAccuracy: 0,
  });
  const [testStats, setTestStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  useEffect(() => {
    const fetchTests = async () => {
      if (session?.user?.id) {
        setLoading(true);

        const userTests = await getUserTests(session.user.id);
        const userdata = await getUserDetails(session.user.id);
        const stats = await getTestStats(session.user.id);
        setUserDetails(userdata);
        setTestStats(stats);

        const totalTests = userTests.length;
        const totalAccuracy = userTests.reduce(
          (acc, test) => acc + test.score,
          0
        );
        const avgAccuracy =
          totalTests > 0 ? (totalAccuracy / totalTests).toFixed(2) : 0;

        setTestSummary({
          totalTests,
          avgAccuracy,
        });

        setTests(userTests);
        setLoading(false);
      }
    };
    fetchTests();
  }, [session]);

  const handleTestClick = async (test) => {
    setLoading(true);
    const result = await getTestResult(test.id, session.user.id);
    if (result.success) {
      setSelectedTest(result.data);
    } else {
      console.error("Failed to fetch test details:", result.error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 flex flex-col">
      <div className="mx-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Details Card */}
        <Card className="shadow-lg transition-transform hover:scale-105 dark:bg-zinc-900 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              {userDetails ? `${userDetails.name}'s Dashboard` : "Loading..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-lg font-medium dark:text-white">
                  {userDetails?.name || "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-normal dark:text-gray-300">
                  {userDetails?.email || "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-normal dark:text-gray-300">
                  {userDetails?.role || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Summary Section */}
        <Card className="shadow-lg transition-transform hover:scale-105 dark:bg-zinc-900 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 text-center gap-4">
            <div>
              <div className="flex justify-center items-center mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-green-400 to-blue-500 rounded-full">
                <p className="text-xl sm:text-2xl font-medium text-white">
                  {testSummary.totalTests}
                </p>
              </div>
              <p className="text-base sm:text-lg font-medium text-black dark:text-white mt-2">
                Total Tests Taken
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full">
                <p className="text-xl sm:text-2xl font-medium text-white">
                  {testSummary.avgAccuracy}%
                </p>
              </div>
              <p className="text-base sm:text-lg text-black font-medium dark:text-white mt-2">
                Average Accuracy
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Stats Section */}
        <Card className="shadow-lg transition-transform hover:scale-105 dark:bg-zinc-900 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Test Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 text-center gap-4">
            <div>
              <div className="flex justify-center items-center mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-blue-200 dark:bg-zinc-700 rounded-full">
                <p className="text-xl sm:text-2xl font-medium dark:text-white">
                  {testStats.easy}
                </p>
              </div>
              <p className="text-base sm:text-lg font-medium text-black dark:text-white mt-2">
                Easy Tests
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-yellow-200 dark:bg-zinc-700 rounded-full">
                <p className="text-xl sm:text-2xl font-medium dark:text-white">
                  {testStats.medium}
                </p>
              </div>
              <p className="text-base sm:text-lg text-black font-medium dark:text-white mt-2">
                Medium Tests
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-red-200 dark:bg-zinc-700 rounded-full">
                <p className="text-xl sm:text-2xl font-medium dark:text-white">
                  {testStats.hard}
                </p>
              </div>
              <p className="text-base sm:text-lg font-medium text-black dark:text-white mt-2">
                Hard Tests
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full mt-8">
        {/* Test List Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-6">
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">
            Your Previous Test Results
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Link href="/community">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-white w-full sm:w-auto">
                Available Tests
              </Button>
            </Link>
            <Link href="/test-start">
              <Button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white w-full sm:w-auto">
                Create New Test With AI
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : selectedTest ? (
          <div className="dark:bg-zinc-900 shadow-lg rounded-xl mx-2 sm:mx-10 p-4">
            <Card>
              <TestDetails test={selectedTest} />
            </Card>
          </div>
        ) : tests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((test) => (
              <TestCard
                key={test.id}
                test={test}
                onClick={() => handleTestClick(test)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl dark:text-white">No tests found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
