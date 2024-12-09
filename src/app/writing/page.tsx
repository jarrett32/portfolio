import { getLatestPosts, getPinnedPosts, type Post } from "../../../lib/posts";
import PostList from "./PostList";

export default function BlogPage() {
  const pinnedPosts: Post[] = getPinnedPosts();
  const latestPosts: Post[] = getLatestPosts();

  console.log(pinnedPosts);
  console.log(latestPosts);

  return (
    <div className="mt-6 flex min-w-0 flex-auto flex-col md:mt-0">
      <h1 className="mb-8 text-3xl font-bold text-white">Blog Posts</h1>
      <PostList pinnedPosts={pinnedPosts} latestPosts={latestPosts} />
    </div>
  );
}
