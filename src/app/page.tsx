"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="relative mt-6 flex w-full min-w-0 flex-auto flex-col md:mt-0">
      <h1 className="nimbus mb-20 mt-[9px] hidden uppercase tracking-wide md:block">
        <Link href="/">Jarrett Thompson</Link>
      </h1>
      <div className="flex-auto">
        <div className="flex flex-1 items-start space-x-4">
          <div className="w-full md:w-9/12">
            <motion.div
              className="prose dark:prose-dark md:prose-base prose-lg prose-h1:text-[17px] prose-h2:text-[17px] prose-h3:text-[17px] md:prose-h1:text-[15px] md:prose-h2:text-[15px] md:prose-h3:text-[15px] prose-p:font-serif prose-ul:font-serif prose-ol:font-serif prose-a:text-primary-600 prose-code:text-pink-500 prose-a:underline-offset-2 dark:prose-p:text-gray-300 dark:prose-a:text-secondary-400 dark:prose-code:text-pink-500 dark:prose-headings:text-white dark:prose-invert prose-pre:bg-[#fafafa] dark:prose-pre:bg-[#0E121A] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                I&apos;m a software engineer living in San Diego, US. I
                specialize in full stack apps and use React, Tailwind, Prisma,
                and more
              </p>{" "}
              <br></br>
              <p>
                When I&apos;m not coding, I enjoy baseball, surfing or anything
                to do with the ocean. Checkout out my Gallery for some action
                shots!
              </p>
            </motion.div>
            {/* <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-4 text-2xl font-bold">Projects</h2>
            </motion.div> */}
          </div>
        </div>
      </div>
      <motion.footer
        className="mt-8 flex items-center justify-between text-sm text-gray-400 md:w-9/12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>© {new Date().getFullYear()} Jarrett Thompson.</div>
        {/* TODO: Make copy and paste */}
        <div className="flex space-x-2">
          <Link
            href="mailto:jarrettthompson32@gmail.com"
            className="text-sm text-gray-500 transition hover:text-gray-600"
          >
            <span className="sr-only">Email</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-[18px] w-[18px] fill-current text-gray-400 hover:opacity-80 dark:text-gray-500"
            >
              <path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z" />
              <path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z" />
            </svg>
          </Link>
          <Link
            href="https://github.com/jarrett32"
            className="text-sm text-gray-500 transition hover:text-gray-600"
          >
            <span className="sr-only">GitHub</span>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[18px] w-[18px] fill-current text-gray-400 hover:opacity-80 dark:text-gray-500"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1
.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
          </Link>
          <Link
            href="https://github.com/jarrett32"
            className="text-sm text-gray-500 transition hover:text-gray-600"
          >
            <span className="sr-only">LinkedIn</span>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[18px] w-[18px] fill-current text-gray-400 hover:opacity-80 dark:text-gray-500"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
        </div>
      </motion.footer>
    </main>
  );
}
