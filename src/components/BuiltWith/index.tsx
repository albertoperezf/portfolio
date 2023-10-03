import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function BuiltWith(): JSX.Element {
  return (
    <div>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Build with
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={70}
          height={24}
          priority
        />
        By{" "}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={styles.vercelLogo}
          width={70}
          height={24}
          priority
        />
      </a>
    </div>
  );
}
