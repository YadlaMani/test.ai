
import React from "react";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/blocks/features-section";
import { JoinNowSection } from "@/components/JoinNowSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { OurTeamSection } from "@/components/OurTeam";

export default function Home() {

  return (
    <div
      className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white font-['Roboto']"
    >
      <Hero />
      <FeaturesSection />
      <JoinNowSection />
      <TestimonialSection />
      <OurTeamSection />
    </div>
  );
}
