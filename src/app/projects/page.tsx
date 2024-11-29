"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Neural Network Visualizer",
    description:
      "An interactive visualization of neural networks built with Three.js and React. Features real-time training visualization and network architecture exploration.",
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com/jarrett32/quantum-computing-simulator",
    link: "https://quantum-computing-simulator.vercel.app/",
  },
  {
    title: "Quantum Computing Simulator",
    description:
      "A quantum circuit simulator that allows users to build and test quantum algorithms. Includes visualization of quantum states and gate operations.",
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com/jarrett32/quantum-computing-simulator",
    link: "https://quantum-computing-simulator.vercel.app/",
  },
];

export default function Page() {
  return (
    <div className="mt-6 flex min-w-0 flex-auto flex-col md:mt-0">
      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            className="group relative cursor-pointer rounded-xl border border-white/20 bg-black/10 p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="h-[200px] w-full object-cover"
              />
            </div>

            {/* Title and Links */}
            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white/90">
                {project.title}
              </h3>
              <div className="flex space-x-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  aria-label={`${project.title} GitHub`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.587v-2.113c-3.337.725-4.037-1.612-4.037-1.612-.55-1.4-1.338-1.775-1.338-1.775-1.087-.75.088-.737.088-.737 1.2.088 1.838 1.238 1.838 1.238 1.087 1.862 2.85 1.325 3.55 1.012.113-.787.425-1.325.762-1.625-2.662-.313-5.462-1.338-5.462-5.962 0-1.325.487-2.412 1.238-3.25-.125-.312-.538-1.575.113-3.288 0 0 1.012-.325 3.313 1.238A11.57 11.57 0 0112 5.75c1.025.012 2.063.137 3.037.4 2.3-1.575 3.312-1.238 3.312-1.238.65 1.713.238 2.975.125 3.288.75.838 1.238 1.925 1.238 3.25 0 4.637-2.812 5.65-5.487 5.962.425.375.813 1.138.813 2.312v3.438c0 .325.2.7.8.588C20.563 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                  </svg>
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  aria-label={`${project.title} Website`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path d="M12 2C6.487 2 2 6.486 2 12s4.487 10 10 10 10-4.486 10-10S17.513 2 12 2zm0 18a7.953 7.953 0 01-4.898-1.717l11.181-11.18A7.946 7.946 0 0120 12c0 4.411-3.589 8-8 8zm-7.899-6.283l11.181-11.18A7.946 7.946 0 0112 4c-4.411 0-8 3.589-8 8a7.945 7.945 0 01.101 1.717z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Subtitle */}
            <p className="mt-2 text-sm font-light text-white/70">
              {project.subtitle || "test"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
