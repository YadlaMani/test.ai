"use client";

import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const loadImages = () => {
      const promises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
        });
      });
      Promise.all(promises).then(setLoadedImages);
    };

    loadImages();
  }, [images]);

  useEffect(() => {
    if (autoplay && loadedImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % loadedImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, loadedImages]);

  const slideVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className={cn(
        "relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg border border-gray-300",
        className
      )}
    >
      {loadedImages.length > 0 && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            alt={`Slide ${currentIndex}`}
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute inset-0 object-contain w-full h-full transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl rounded-lg"
          />
        </AnimatePresence>
      )}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black/20 rounded-lg", // Adjust the opacity here as needed
            overlayClassName
          )}
        />
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{
              scale: currentIndex === index ? 1.5 : 1,
              transition: { duration: 0.3 },
            }}
          />
        ))}
      </div>
    </div>
  );
};
