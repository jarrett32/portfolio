"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Photo {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  title: string;
  desc: string;
}

const photos = [
  {
    id: 1,
    src: "/guitar_fish.jpg",
    title: "Guitar Fish",
    desc: "A guitar fish swimming near the bottom. One of the largest ones I've ever seen.",
    width: 16 * 20,
    height: 9 * 20,
  },
  {
    id: 2,
    src: "/horn_shark.jpg",
    title: "Horn Shark ?",
    desc: "Found this guy resting in a very tight crevice. Believe he is a horn shark not completely sure.",
    width: 16 * 25,
    height: 9 * 25,
  },
];

export default function Page() {
  const [hoveredPhoto, setHoveredPhoto] = useState<Photo | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);
  const [randomizedPhotos, setRandomizedPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Initialize photos with random x and y positions
    const initializedPhotos = photos.map((photo) => ({
      ...photo,
      x: Math.random() * 80, // Ensure they don't overlap edges
      y: Math.random() * 80, // Ensure they don't overlap edges
    }));
    setRandomizedPhotos(initializedPhotos);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="mt-6 flex min-w-0 flex-auto flex-col md:mt-0">
      <div ref={galleryRef} className="relative h-[600px] w-full">
        {randomizedPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            className="absolute"
            style={{
              left: `${photo.x}%`,
              top: `${photo.y}%`,
              width: photo.width,
              height: photo.height,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: Math.random() * 0.5 }}
          >
            <div
              className="relative h-full w-full cursor-pointer"
              onMouseEnter={() => setHoveredPhoto(photo)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]" />
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {hoveredPhoto && (
            <motion.div
              className="pointer-events-none absolute z-10 rounded-lg bg-black/80 p-4 text-white shadow-lg"
              style={{
                left: mousePosition.x + 20,
                top: mousePosition.y - 60,
                maxWidth: "200px",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-2 text-lg font-semibold">
                {hoveredPhoto.title}
              </h3>
              <p className="text-sm">{hoveredPhoto.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
