import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const UserCard = ({ userDetails }) => {
  const isLoading = !userDetails;
  return (
    <Card className="shadow-lg w-full dark:border-0 dark:bg-zinc-900 text-center">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          {isLoading ? "Loading ..." : `${userDetails.name}'s Dashboard`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-950 dark:text-gray-400" />
          </div>
        ) : (
          <>
            <p className="text-lg font-medium dark:text-white">{userDetails.name}</p>
            <p className="dark:text-gray-300">{userDetails.email}</p>
            <p className="dark:text-gray-300">{userDetails.role}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
