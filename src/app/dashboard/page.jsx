"use client";
import React, { useState, useEffect } from "react";
import { getUserTests, getTestResult } from "../../actions/testActions";
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

  useEffect(() => {
    const fetchTests = async () => {
      if (session?.user?.id) {
        setLoading(true);

        const userTests = await getUserTests(session.user.id);
        const userdata = await getUserDetails(session.user.id);
        console.log(userdata);
        setUserDetails(userdata);

        // Calculate total tests and average accuracy
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
    console.log(result);
    if (result.success) {
      setSelectedTest(result.data);
    } else {
      console.error("Failed to fetch test details:", result.error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 pb-16">
      <Card className="mb-6 px-6 py-4 shadow-lg dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            {userDetails ? `${userDetails.name}'s Dashboard` : "Loading..."}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3 text-center md:text-left">
          <div>
            <p className="text-lg font-medium dark:text-zinc-100">
              {userDetails?.name || "N/A"}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Name</p>
          </div>
          <div>
            <p className="text-lg font-medium dark:text-zinc-100">
              {userDetails?.email || "N/A"}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Email</p>
          </div>
          <div>
            <p className="text-lg font-medium dark:text-zinc-100">
              {userDetails?.role || "N/A"}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Role</p>
          </div>
        </CardContent>
      </Card>

      {/* Test Summary Section */}
      <Card className="mb-6 px-6 py-4 shadow-lg dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Test Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
          <div>
            <p className="text-2xl font-bold dark:text-white">
              {testSummary.totalTests}
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Total Tests Taken
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold dark:text-white">
              {testSummary.avgAccuracy}%
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Average Accuracy
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Test List Section */}
      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className="text-3xl font-bold dark:text-white">
          Your Previous Test Results
        </h1>
        <div className="flex flex-row gap-2">
          <Link href="/community">
            <Button className="bg-black text-white dark:bg-white dark:text-black">
              Available Tests
            </Button>
          </Link>
          <Link href="/test-start">
            <Button className="bg-black text-white dark:bg-white dark:text-black">
              Create New Test
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : selectedTest ? (
        <div className="dark:bg-zinc-900 shadow-lg rounded-xl mx-10">
          <CardContent>
            <TestDetails
              test={selectedTest}
              onClose={() => setSelectedTest(null)}
            />
          </CardContent>
        </div>
      ) : tests.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-semibold text-gray-500">
            You haven't given any tests yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 gap-4">
          {tests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              onClick={() => handleTestClick(test)}
            />
          ))}
        </div>
      )}

      {selectedTest && (
        <div className="mt-4">
          <Button onClick={() => setSelectedTest(null)}>
            Back to All Tests
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
