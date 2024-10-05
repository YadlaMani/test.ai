import React from "react";
import { useId } from "react";

export function FeaturesSection() {
  return (
    <div className="py-10 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "AI-Generated Custom Quizzes",
    description:
      "Create personalized quizzes tailored to your needs, with a custom number of questions, time limits, and difficulty levels, all powered by AI.",
  },
  {
    title: "Custom Difficulty Levels",
    description:
      "Select the difficulty level of your quizzes, from beginner to expert, and let AI generate questions that match your proficiency.",
  },
  {
    title: "AI-Powered Quiz Scoring",
    description:
      "Submit your completed quizzes for AI-driven scoring and receive instant results with detailed performance breakdowns.",
  },
  {
    title: "Custom Feedback with AI Insights",
    description:
      "Get personalized feedback on your quiz performance, with AI providing insights and suggestions to help you improve.",
  },
  {
    title: "Time Management Features",
    description:
      "Set custom time limits for your quizzes to practice under pressure and enhance your time management skills.",
  },
  {
    title: "Community-Driven Learning",
    description:
      "Join a vibrant community where you can discuss quizzes, share knowledge, and receive feedback from peers and experts.",
  },
  {
    title: "Collaborative Quiz Sharing",
    description:
      "Share your custom quizzes with the community or specific users, allowing for collaborative learning and knowledge exchange.",
  },
  {
    title: "Real-Time AI Assistance",
    description:
      "Get real-time assistance from AI during quiz creation or feedback to fine-tune your learning and performance.",
  },
];

export const Grid = ({ pattern, size }) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
