"use client";

import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { type PostMeta } from "../../../lib/posts";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: {
    slug: string;
    meta: PostMeta;
  };
  index: number;
}

export default function PostCard({ post }: PostCardProps) {
  const isPinned = post.meta.pinned;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/writing/${post.slug}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`h-16 w-full cursor-pointer rounded-lg p-4 ${
        isPinned ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-white/5"
      }`}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex h-full items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{post.meta.title}</h3>
        {isPinned && <Pin className="h-5 w-5 text-yellow-400" />}
      </div>
    </motion.div>
  );
}
