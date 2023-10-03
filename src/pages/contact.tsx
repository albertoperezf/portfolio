import { Inter } from "next/font/google";
import BuiltWith from "@/components/BuiltWith";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Contact(): JSX.Element {
  return (
    <div className={`${styles.main} ${inter.className}`}>
      <div className={styles.description}>
        <Header />
        <BuiltWith />
      </div>

      <div className={styles.center} />

      <Footer />
    </div>
  );
}
