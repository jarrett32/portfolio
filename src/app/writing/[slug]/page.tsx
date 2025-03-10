import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostBySlug } from "lib/posts";
import { PostHeader, TableOfContents } from "./TableOfContents";
import Image, { type ImageProps } from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "_posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}

type PostProps = Promise<{ slug: string }>;

export default async function BlogPost(props: { params: PostProps }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  };

  function nextImage(props: ImageProps) {
    const { alt, ...otherProps } = props;
    return <Image alt={alt} {...otherProps} />;
  }

  function YouTubeVideo(props: { videoid: string }) {
    return <YouTubeEmbed videoid={props.videoid} />;
  }

  const components = {
    a: CustomLink,
    Image: nextImage,
    YouTubeVideo: YouTubeVideo,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PostHeader post={post} />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <main
          className={
            post.meta.show_table_of_contents ? "lg:w-3/4" : "lg:w-full"
          }
        >
          <article className="prose dark:prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </article>
        </main>
        {post.meta.show_table_of_contents && (
          <aside className="lg:w-1/4">
            <div className="sticky top-8">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
