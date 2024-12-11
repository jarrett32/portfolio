"use client";

import { type Post } from "../../../lib/posts";
import PostCard from "./PostCard";

interface BlogPostListProps {
  pinnedPosts: Post[];
  latestPosts: Post[];
}

export default function PostList({
  pinnedPosts,
  latestPosts,
}: BlogPostListProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-xl font-bold text-white">Pinned Posts</h2>
        <div className="flex flex-col space-y-4">
          {pinnedPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-xl font-bold text-white">Latest Posts</h2>
        <div className="flex flex-col space-y-4">
          {latestPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
