"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const Dropdown = React.forwardRef(({ className, options, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const dropdownRef = React.useRef(null);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <div
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder-text-neutral-600
            focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
            disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400`,
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
        </div>
      </motion.div>
      {isOpen && (
        <ul
          className="absolute z-10 w-full bg-gray-50 dark:bg-zinc-800 shadow-md rounded-md overflow-auto"
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export { Dropdown };
