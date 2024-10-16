"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  let w, h, nt, i, x, ctx, canvas;
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme(); 
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const initCanvas = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;

    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    renderCanvas();
    setCanvasInitialized(true); 
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // Adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId;
  const renderCanvas = () => {
    ctx.clearRect(0, 0, w, h);
    
    ctx.fillStyle = resolvedTheme === "light" ? "white" : "black"; 
    ctx.globalAlpha = 1; 
    ctx.fillRect(0, 0, w, h);
    
    ctx.globalAlpha = waveOpacity || 0.5;
    
    drawWave(5); // Draw waves
    animationId = requestAnimationFrame(renderCanvas); 
  };

  useEffect(() => {
    if (resolvedTheme) {
      initCanvas(); 
    }
    return () => {
      cancelAnimationFrame(animationId); 
    };
  }, [resolvedTheme]); 

  useEffect(() => {
    if (canvasInitialized && ctx) {
      ctx.clearRect(0, 0, w, h); 
    }
  }, [resolvedTheme]); 

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-max py-16 flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute max-w-full w-full h-[30rem] z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
