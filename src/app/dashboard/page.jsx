"use client";
import React, { useState, useEffect } from "react";
import { getUserTests } from "../../actions/testActions";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getUserDetails } from "@/actions";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Import medal images
import medal1 from '/public/medal1.png';
import medal2 from '/public/medal2.png';
import medal3 from '/public/medal3.png';
import medal4 from '/public/medal4.png';
import medal5 from '/public/medal5.png';

Chart.register(...registerables);

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState(null);
  const [testSummary, setTestSummary] = useState({
    totalTests: 0,
    avgAccuracy: 0,
  });
  const [userActivity, setUserActivity] = useState({});
  const [badges, setBadges] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [activityDetails, setActivityDetails] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      if (session?.user?.id) {
        setLoading(true);
        const userTests = await getUserTests(session.user.id);
        const userdata = await getUserDetails(session.user.id);
        setUserDetails(userdata);

        const totalTests = userTests.length;
        const totalAccuracy = userTests.reduce((acc, test) => acc + test.score, 0);
        const avgAccuracy = totalTests > 0 ? (totalAccuracy / totalTests).toFixed(2) : 0;

        setTestSummary({ totalTests, avgAccuracy });
        setTests(userTests);

        // Determine badges based on average accuracy
        const userBadges = [];
        if (avgAccuracy > 0) userBadges.push(medal1);
        if (avgAccuracy > 30) userBadges.push(medal2);
        if (avgAccuracy > 60) userBadges.push(medal3);
        if (avgAccuracy > 80) userBadges.push(medal4);
        if (avgAccuracy > 95) userBadges.push(medal5);
        setBadges(userBadges);

        const activityData = {};
        userTests.forEach(test => {
          const month = new Date(test.date).toLocaleString('default', { month: 'long' });
          
          if (!activityData[month]) {
            activityData[month] = {
              count: 0,
              tests: [],
              totalTime: 0,
            };
          }
          activityData[month].count += 1;
          activityData[month].tests.push(test);
          activityData[month].totalTime += test.timeSpent || 0;
        });
        setUserActivity(activityData);
        setLoading(false);
      }
    };
    fetchTests();
  }, [session]);

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
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(32, 178, 166, 0.5)' },
        ticks: { color: '#20B2A6' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(32, 178, 166, 0.5)' },
        ticks: { color: '#20B2A6' },
      },
    },
  };

  const handleMonthClick = (month) => {
    if (selectedMonth === month) {
      // Close if already open
      setSelectedMonth(null);
      setActivityDetails("");
    } else {
      const { count, totalTime, tests } = userActivity[month];
      const formattedTime = (totalTime / 60).toFixed(2);
      setSelectedMonth(month);
      setActivityDetails({ count, totalTime: formattedTime, tests });
    }
  };

  const renderMonthlyActivity = () => {
    const months = Object.keys(userActivity);

    return (
      <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-800">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Monthly Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {months.map(month => (
            <div 
              key={month} 
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded shadow-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={() => handleMonthClick(month)}
            >
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{month}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{`${userActivity[month].count} activities`}</span>
            </div>
          ))}
        </div>
        
        {selectedMonth && activityDetails && (
          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white rounded shadow-lg">
            <h4 className="font-semibold text-xl">{selectedMonth} Activity Details</h4>
            <div className="flex justify-between mb-2">
              <div className="text-lg font-bold">{activityDetails.count} Activities</div>
              <div className="text-lg font-bold">{activityDetails.totalTime} hours</div>
            </div>
            <h5 className="font-semibold">Tests Taken:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activityDetails.tests.map((test, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg transition transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white text-lg font-semibold">{test.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800 dark:text-gray-200">Score: <strong>{test.score}</strong></p>
                    <p className="text-gray-800 dark:text-gray-200">Time Spent: <strong>{test.timeSpent} minutes</strong></p>
                    <p className="text-gray-800 dark:text-gray-200">Date: <strong>{new Date(test.date).toLocaleDateString()}</strong></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 pb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="shadow-lg dark:bg-zinc-900 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            {userDetails ? `${userDetails.name}'s Dashboard` : "Loading..."}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-center md:text-left">
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-zinc-100">{userDetails?.name || "N/A"}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Name</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-zinc-100">{userDetails?.email || "N/A"}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Email</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-zinc-100">{userDetails?.role || "N/A"}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Role</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg dark:bg-zinc-900 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Test Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{testSummary.totalTests}</p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Total Tests Taken</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{testSummary.avgAccuracy}%</p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Average Accuracy</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg dark:bg-zinc-900 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Your Badges</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center">
          {badges.map((badge, index) => (
            <img 
              key={index} 
              src={badge.src} 
              alt={`Badge ${index + 1}`} 
              className="h-12 w-12 mx-2" // Adjust size as needed
            />
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg dark:bg-zinc-900 bg-white md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Activity Status</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader2 className="animate-spin h-10 w-10 mx-auto" />
          ) : (
            renderMonthlyActivity()
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg dark:bg-zinc-900 bg-white md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Test Scores Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <Loader2 className="animate-spin h-10 w-10 mx-auto" /> : <Line data={chartData} options={chartOptions} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
