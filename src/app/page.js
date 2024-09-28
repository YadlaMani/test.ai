"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import { ImagesSlider } from "../components/ui/ImageSlider";
import Link from "next/link";
import lottie from "lottie-web";

const Testimonial = ({ text, author, image }) => (
  <motion.div
    className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    viewport={{ once: true }}
  >
    <img
      src={image}
      alt={author}
      className="w-16 h-16 rounded-full mb-4 shadow-md"
    />
    <blockquote className="italic text-gray-700">"{text}"</blockquote>
    <p className="mt-4 font-semibold text-gray-800">— {author}</p>
  </motion.div>
);

const FeatureCard = ({ title, description, icon, isLeft }) => (
  <motion.div
    className={`flex relative mb-16 ${
      isLeft ? "flex-row-reverse" : "flex-row"
    }`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    <div className="w-3/4 bg-white p-8 rounded-lg shadow-lg relative z-10 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
    <div
      className={`absolute ${
        isLeft ? "left-0" : "right-0"
      } -bottom-8 w-1/4 flex justify-center`}
    >
      <img
        src={icon}
        alt={title}
        className="max-w-[120px] h-auto rounded-lg shadow-lg transition-transform transform hover:scale-110"
        style={{ marginBottom: "-30px" }}
      />
    </div>
  </motion.div>
);

export default function Home() {
  const mainRef = useRef(null);
  const animationContainer = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: mainRef.current,
      smooth: true,
    });

    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animation.json",
    });

    return () => {
      scroll.destroy();
      animation.destroy();
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="flex flex-col min-h-screen bg-white text-gray-800 font-['Roboto']"
    >
      <header className="flex flex-col items-start justify-center h-screen p-10 text-left bg-blue-600 relative overflow-hidden rounded-b-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative text-6xl font-extrabold text-white z-10 tracking-tight drop-shadow-lg"
        >
          Empower Your Learning
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative mt-4 text-xl text-white max-w-2xl z-10 tracking-wide"
        >
          Create personalized quizzes and receive tailored feedback to enhance
          your knowledge.
        </motion.p>
        <motion.a
          href="http://localhost:3000/auth/signup"
          className="relative mt-6 px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          Get Started
        </motion.a>
        <div
          ref={animationContainer}
          className="absolute right-10 top-1/3 w-1/3 hidden md:block"
        ></div>
      </header>

      <main className="flex-grow">
        {/* About Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-blue-50 p-10 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                About Us
              </h2>
              <p className="text-gray-600 mb-4">
                At test.ai, we believe in empowering individuals through
                personalized learning. Our platform combines technology and
                educational expertise to provide a unique testing experience.
              </p>
              <p className="mt-4 text-gray-600">
                With a team of experienced educators and developers, we aim to
                create a seamless interface for users to engage with their
                learning materials effectively.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              Our Features
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Innovating the way you learn.
            </p>
            <FeatureCard
              title="Intelligent Quiz Creation"
              description="Leverage our AI to design quizzes tailored to your preferences, ensuring effective learning."
              icon="/quiz.png"
              isLeft={false}
            />
            <FeatureCard
              title="Detailed Performance Analysis"
              description="Receive in-depth insights on your performance to focus on areas that need improvement."
              icon="/analysis.png"
              isLeft={true}
            />
            <FeatureCard
              title="Personalized Learning Paths"
              description="Follow tailored learning paths that adapt to your progress and goals."
              icon="/path.png"
              isLeft={false}
            />
            <FeatureCard
              title="Engaging Learning Resources"
              description="Access a variety of resources to enrich your learning experience."
              icon="/resource.png"
              isLeft={true}
            />
          </div>
        </section>

        {/* Experience Our Platform Section */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">
              Explore test.ai
            </h2>
            <p className="text-lg text-gray-700 mb-10">
              Discover how our innovative features can elevate your learning
              experience.
            </p>
            <ImagesSlider images={["1.jpeg", "2.jpeg", "3.jpeg"]} />
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">
              Join the Learning Revolution
            </h2>
            <p className="mt-4 text-lg text-gray-600 mb-10">
              Become part of a community dedicated to continuous improvement and
              innovation.
            </p>

            <motion.a
              href="/auth/signup"
              className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              Sign Up Now
            </motion.a>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Testimonial
                text="test.ai has transformed my approach to studying!"
                author="User A"
                image="/user1.jpg"
              />
              <Testimonial
                text="The personalized feedback is invaluable."
                author="User B"
                image="/user2.jpg"
              />
              <Testimonial
                text="A fantastic tool for anyone looking to improve."
                author="User C"
                image="/user3.jpg"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center bg-blue-200">
        <p className="text-gray-700">© 2024 test.ai - All Rights Reserved</p>
      </footer>
    </div>
  );
}
