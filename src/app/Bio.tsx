import Link from "next/link";

export default function Bio() {
  return (
    <>
      <p>
        I&apos;m a software engineer living in San Diego, US. I specialize in
        full stack apps and use React, Tailwind, Prisma, and more
      </p>{" "}
      <br></br>
      <p>
        I also enjoy baseball, diving, or anything to do with the ocean. You can
        see some some my finds{" "}
        <Link
          href={
            "https://github.com/jarrett32/portfolio/tree/main/public/diving"
          }
        >
          here
        </Link>
      </p>
    </>
  );
}
