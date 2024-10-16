
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BadgesCard = ({ badges }) => (
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
);

export default BadgesCard;
