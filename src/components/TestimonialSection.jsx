"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function TestimonialSection() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h1 className="capitalize text-5xl font-bold font-sans max-w-2xl text-center my-4">Here's what people are saying about us.</h1>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This platform revolutionized the way I prepare for exams. The AI-generated quizzes are spot on, and the instant feedback helps me improve immediately.",
    name: "Sarah Johnson",
    title: "University Student",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    quote:
      "As an educator, I've found this tool invaluable. Creating quizzes has never been easier, and my students love the custom difficulty options!",
    name: "Michael Lee",
    img: "https://avatar.vercel.sh/jenny",
    title: "High School Teacher",
  },
  {
    quote:
      "I was amazed by the AI's ability to adapt quizzes to my level. It's perfect for brushing up on specific topics or testing my overall knowledge.",
    name: "Emily Turner",
    img: "https://avatar.vercel.sh/jenny",
    title: "Software Engineer",
  },
  {
    quote:
      "The community features are fantastic! I've connected with other learners, and we challenge each other with custom quizzes every week.",
    name: "James Roberts",
    img: "https://avatar.vercel.sh/jenny",
    title: "Freelance Developer",
  },
  {
    quote:
      "The AI-powered quiz generation is a game-changer. I can customize everything, from the number of questions to the difficulty level. Highly recommended!",
    name: "Olivia Martinez",
    img: "https://avatar.vercel.sh/jenny",
    title: "Entrepreneur",
  },
];
