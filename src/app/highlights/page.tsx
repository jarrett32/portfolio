"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Photo {
  id: number;
  width: number;
  height: number;
  src: string;
  title: string;
  desc: string;
}

interface PositionedPhoto extends Photo {
  x: number;
  y: number;
}

const photos: Photo[] = [
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
  {
    id: 3,
    src: "/calico.jpg",
    title: "Calico Bass ?",
    desc: "says hi",
    width: 16 * 25,
    height: 9 * 25,
  },
];

export default function Page() {
  const [hoveredPhoto, setHoveredPhoto] = useState<PositionedPhoto | null>(
    null,
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [randomizedPhotos, setRandomizedPhotos] = useState<PositionedPhoto[]>(
    [],
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const isOverlapping = (
    photo: PositionedPhoto,
    others: PositionedPhoto[],
    threshold = 300,
  ) => {
    return others.some((other) => {
      const dx = photo.x - other.x;
      const dy = photo.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance < threshold;
    });
  };

  useEffect(() => {
    const initializePhotos = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const placedPhotos: PositionedPhoto[] = [];

      const photosWithPositions: PositionedPhoto[] = photos.map((photo) => {
        const newPhoto: PositionedPhoto = { ...photo, x: 0, y: 0 };

        do {
          newPhoto.x = Math.random() * (containerWidth - photo.width);
          newPhoto.y = Math.random() * (containerHeight - photo.height);
        } while (isOverlapping(newPhoto, placedPhotos));

        placedPhotos.push(newPhoto);
        return newPhoto;
      });

      setRandomizedPhotos(photosWithPositions);
    };

    initializePhotos();
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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setOffset((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    };

    const stopDragging = () => setDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };
  }, [dragging]);

  return (
    <div
      className="relative mx-auto h-[600px] w-[800px] overflow-hidden border border-gray-600"
      ref={galleryRef}
    >
      <div
        ref={containerRef}
        className="absolute h-full w-full"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        {randomizedPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            className="absolute"
            style={{
              left: `${photo.x}px`,
              top: `${photo.y}px`,
              width: `${photo.width}px`,
              height: `${photo.height}px`,
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
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {hoveredPhoto && (
          <motion.div
            className="pointer-events-none absolute z-10 rounded-lg bg-black/80 p-4 text-white shadow-lg"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 60,
              maxWidth: "350px",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-2 text-lg font-semibold">{hoveredPhoto.title}</h3>
            <p className="text-sm">{hoveredPhoto.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
