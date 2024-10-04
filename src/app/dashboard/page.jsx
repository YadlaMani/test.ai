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

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTests = async () => {
      if (session?.user?.id) {
        setLoading(true);
        const userTests = await getUserTests(session.user.id);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Previous Test Results</h1>
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
        <Card>
          <CardHeader>
            <CardTitle>Test Details</CardTitle>
          </CardHeader>
          <CardContent>
            <TestDetails
              test={selectedTest}
              onClose={() => setSelectedTest(null)}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
