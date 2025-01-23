"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <div className="h-[100px]" />,
});

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false },
);

const Bio = dynamic(() => import("./Bio"), {
  loading: () => <div className="h-[100px]" />,
});

export default function Page() {
  return (
    <main className="relative mt-6 flex w-full min-w-0 flex-auto flex-col md:mt-0">
      <h1 className="nimbus mb-20 mt-[9px] hidden uppercase tracking-wide md:block">
        <Link href="/">Jarrett Thompson</Link>
      </h1>
      <div className="flex-auto">
        <div className="flex flex-1 items-start space-x-4">
          <div className="w-full md:w-9/12">
            <MotionDiv
              className="prose dark:prose-dark md:prose-base prose-lg prose-h1:text-[17px] prose-h2:text-[17px] prose-h3:text-[17px] md:prose-h1:text-[15px] md:prose-h2:text-[15px] md:prose-h3:text-[15px] prose-p:font-serif prose-ul:font-serif prose-ol:font-serif prose-a:text-primary-600 prose-code:text-pink-500 prose-a:underline-offset-2 dark:prose-p:text-gray-300 dark:prose-a:text-secondary-400 dark:prose-code:text-pink-500 dark:prose-headings:text-white dark:prose-invert prose-pre:bg-[#fafafa] dark:prose-pre:bg-[#0E121A] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Bio />
            </MotionDiv>
            <div className="p-8"></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MotionDiv
                className=""
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="writing/power-of-multimodal-technique"
                  className="block"
                >
                  <div className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700">
                    <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      Latest Project
                    </p>
                    <time className="text-sm text-gray-500 dark:text-gray-500">
                      December 29, 2024
                    </time>
                  </div>
                </Link>
              </MotionDiv>
              <MotionDiv
                className=""
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="writing/tools-i-used-in-2024">
                  <div className="rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700">
                    <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      Tools I used in 2024
                    </p>
                    <time className="text-sm text-gray-500 dark:text-gray-500">
                      December 25, 2024
                    </time>
                  </div>
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
