"use client";
import React, { useState, useEffect } from "react";
import { getUserTests, getTestResult, getTestStats } from "../../actions/testActions";
import TestCard from "../../components/TestCard";
import TestDetails from "../../components/TestDetails";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getUserDetails } from "@/actions";
import Link from 'next/link';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState(null);
  const [testSummary, setTestSummary] = useState({ totalTests: 0, avgAccuracy: 0 });
  const [testStats, setTestStats] = useState({ easy: 0, medium: 0, hard: 0 });
  const [badges, setBadges] = useState([]);

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
        const totalAccuracy = userTests.reduce((acc, test) => acc + test.score, 0);
        const avgAccuracy = totalTests > 0 ? (totalAccuracy / totalTests).toFixed(2) : 0;

        setTestSummary({ totalTests, avgAccuracy });
        setTests(userTests);
        setBadges(calculateBadges(avgAccuracy));
        setLoading(false);
      }
    };
    fetchTests();
  }, [session]);

  const calculateBadges = (accuracy) => {
    const badgeImages = [
      { threshold: 100, src: "/medal1.png" },
      { threshold: 80, src: "/medal2.png" },
      { threshold: 60, src: "/medal3.png" },
      { threshold: 40, src: "/medal4.png" },
      { threshold: 0, src: "/medal5.png" },
    ];

    return badgeImages.filter(badge => accuracy >= badge.threshold).map(badge => badge.src);
  };

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

  const handleCloseDetails = () => {
    setSelectedTest(null);
  };

  const chartData = {
    labels: tests.map((test) => new Date(test.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Test Scores',
        data: tests.map((test) => test.score),
        fill: true,
        backgroundColor: 'rgba(32, 178, 166, 0.2)',
        borderColor: 'rgba(32, 178, 166, 1)',
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#20B2A6',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#20B2A6' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#20B2A6' },
      },
    },
  };

  return (
    <div className="container mx-auto p-4 pb-16 flex flex-col md:flex-row">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row mb-6">
          <div className="flex-1 mb-4 md:mb-0 md:flex md:flex-col md:justify-center md:items-center">
            <Card className="shadow-lg w-full dark:border-0 dark:bg-zinc-900 text-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {userDetails ? `${userDetails.name}'s Dashboard` : "Loading..."}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium dark:text-white">{userDetails?.name || "N/A"}</p>
                <p className="dark:text-gray-300">{userDetails?.email || "N/A"}</p>
                <p className="dark:text-gray-300">{userDetails?.role || "N/A"}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

          <Card className="shadow-lg dark:border-0 dark:bg-zinc-900 text-center">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center space-x-2">
              {badges.length > 0 ? (
                badges.map((badgeSrc, index) => (
                  <img key={index} src={badgeSrc} alt={`Badge ${index + 1}`} className="w-12 h-12" />
                ))
              ) : (
                <p className="dark:text-white">No badges earned yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

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

        <div className="w-full mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-6">
            <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">Your Previous Test Results</h1>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
              <Link href="/community">
                <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100 transition duration-200 w-full sm:w-auto">
                  Available Tests
                </Button>
              </Link>
              <Link href="/test-start">
                <Button className="bg-black text-white border border-gray-300 hover:bg-gray-800 transition duration-200 w-full sm:w-auto">
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
                <TestDetails test={selectedTest} onClose={handleCloseDetails} />
              </Card>
            </div>
          ) : tests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tests.map((test) => (
                <TestCard key={test.id} test={test} onClick={() => handleTestClick(test)} />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl dark:text-white">No tests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
