import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Footer(): JSX.Element {
  return (
    <div className={styles.grid}>
      <Link
        href="https://stackoverflow.com/users/6450931/alberto-perez"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          Stackoverflow <span>-&gt;</span>
        </h2>
        <p>{`Find my interactions in the world's biggest developer platform.`}</p>
      </Link>

      <Link
        href="https://www.linkedin.com/in/albertojpf/"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          LinkedIn <span>-&gt;</span>
        </h2>
        <p>Learn more about my professional trajectory.</p>
      </Link>

      <Link
        href="https://github.com/albertoperezf"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          Github <span>-&gt;</span>
        </h2>
        <p>Check out some of my personal work (including this portfolio).</p>
      </Link>
    </div>
  );
}
