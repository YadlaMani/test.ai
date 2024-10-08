
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserCard = ({ userDetails }) => (
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
);

export default UserCard;
