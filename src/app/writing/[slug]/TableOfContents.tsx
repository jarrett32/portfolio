"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { type Post } from "lib/posts";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = content.match(/^#{1,3} .+$/gm) ?? [];
    const tocItems = headings.map((heading) => {
      const level = heading.split(" ")[0]?.length ?? 0; // Provide a default value of 0
      const text = heading.replace(/^#{1,3} /, "");
      const id = text.toLowerCase().replace(/[^\w]+/g, "-");
      return { id, text, level };
    });
    setToc(tocItems);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <nav className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-auto pr-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            className="relative"
          >
            <a
              href={`#${item.id}`}
              className={`block rounded px-2 py-1 text-white transition-colors duration-200 ease-in-out hover:text-gray-900 dark:text-white dark:hover:text-gray-100 ${activeId === item.id ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : ""} `}
            >
              <div className="flex items-center">
                <span className="truncate">
                  {item.text.length > 25
                    ? item.text.slice(0, 25) + "..."
                    : item.text}
                </span>
              </div>
            </a>
            {activeId === item.id && (
              <div className="absolute bottom-0 left-0 top-0 w-1 rounded-r bg-blue-500" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-8">
      <h1 className="mb-4 text-4xl font-bold">{post.meta.title}</h1>
      {post.meta.description && (
        <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
          {post.meta.description}
        </p>
      )}
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <time dateTime={post.meta.updated_at}>
          {new Date(post.meta.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      {post.meta.image_src && (
        <div className="relative mt-6 aspect-video">
          <Image
            src={post.meta.image_src}
            alt={post.meta.image_alt ?? post.meta.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
    </header>
  );
}