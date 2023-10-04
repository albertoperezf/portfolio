import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "@/styles/Home.module.css";

export default function Header(): JSX.Element {
  const t = useTranslations("Header");

  return (
    <Link className={styles.name} href="/">
      Alberto Perez&nbsp;
      <code className={styles.code}>{t("developer")}</code>
    </Link>
  );
}
