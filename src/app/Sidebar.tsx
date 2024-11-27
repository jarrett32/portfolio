"use client";

import Link from "next/link";
import { Frame, TrainFrontTunnel } from "lucide-react";
import { motion } from "framer-motion";
import { type RefObject, useRef } from "react";
import { addAreaParticles } from "./AnimatedBackground";

export function Sidebar() {
  const aboutRef = useRef<HTMLDivElement>(null);
  //   const blogRef = useRef<HTMLDivElement>(null);
  //   const projectsRef = useRef<HTMLDivElement>(null);

  const handleAddParticles = (
    ref: RefObject<HTMLDivElement>,
    count: number,
  ) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      addAreaParticles({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        count: count,
      });
    }
  };

  return (
    <aside className="relative -mx-4 md:mx-0 md:w-[200px] md:flex-shrink-0 md:px-0">
      <div className="lg:sticky lg:top-20">
        <div className="mb-2 flex flex-col items-start space-y-10 px-4 md:mb-20 md:flex-row md:px-0">
          <Link href="/" className="fill-primary-600 dark:fill-secondary-500">
            <TrainFrontTunnel className="h-9 w-9" />
          </Link>
        </div>
        <div className="relative">
          <nav
            className="fade relative z-10 flex scroll-pr-6 flex-row items-start overflow-scroll px-4 pb-4 md:relative md:left-[-6px] md:top-[-7px] md:flex-col md:overflow-auto md:px-0 md:pb-0"
            id="nav"
          >
            <div className="flex flex-row space-x-4 pr-10 md:flex-col md:space-x-0">
              <motion.div
                className="flex flex-col-reverse items-center py-1 text-sm md:flex-row"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddParticles(aboutRef, 10)}
                ref={aboutRef}
              >
                <div className="bg-primary-500 dark:bg-secondary-500 mt-1 h-[4px] w-[4px] scale-125 rounded-full transition-transform md:relative md:left-[1px] md:mr-2 md:mt-0"></div>
                <Link
                  href="/"
                  className="text-primary-600 dark:text-secondary-400 transition-opacity"
                >
                  About
                </Link>
              </motion.div>
              {/* <motion.div
                className="flex flex-col-reverse items-center py-1 text-sm md:flex-row"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddParticles(blogRef, 10)}
                ref={blogRef}
              >
                <div className="dark:bg-secondary-500 mt-1 h-[4px] w-[4px] scale-0 rounded-full transition-transform md:relative md:left-[1px] md:mr-2 md:mt-0"></div>
                <Link
                  href="/projects"
                  className="transition-opacity hover:opacity-60 dark:text-gray-400"
                >
                  Blog
                </Link>
              </motion.div>
              <motion.div
                className="flex flex-col-reverse items-center py-1 text-sm md:flex-row"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddParticles(projectsRef, 10)}
                ref={projectsRef}
              >
                <div className="dark:bg-secondary-500 mt-1 h-[4px] w-[4px] scale-0 rounded-full transition-transform md:relative md:left-[1px] md:mr-2 md:mt-0"></div>
                <Link
                  href="/projects"
                  className="transition-opacity hover:opacity-60 dark:text-gray-400"
                >
                  Projects
                </Link>
              </motion.div> */}
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}
