import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <Link className={styles.name} href="/">
      Alberto Perez&nbsp;
      <code className={styles.code}>Frontend Developer</code>
    </Link>
  );
}
