"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    addAnimation();
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(userPrefersDark.matches ? "dark" : "light");

    // Update theme dynamically when preference changes
    userPrefersDark.addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    });

    return () => {
      userPrefersDark.removeEventListener("change", null);
    };
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "w-[350px] max-w-full relative rounded-md border dark:border-zinc-800 flex-shrink-0 px-8 py-6 md:w-[450px] bg-white text-black dark:bg-black dark:text-white"
            )}
            key={idx}
          >
            <div className="flex flex-row items-center gap-2">
              <img
                className="rounded-full"
                width="32"
                height="32"
                alt=""
                src={item.img}
              />
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium font-sans dark:text-white">
                  {item.name}
                </figcaption>
                <p className="text-xs font-medium font-sans dark:text-white/40">
                  {item.title}
                </p>
              </div>
            </div>
            <blockquote className="mt-2 text-sm font-sans">{item.quote}</blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
