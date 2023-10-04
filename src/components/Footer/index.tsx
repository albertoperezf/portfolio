import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import styles from "@/styles/Home.module.css";

const homeLinks = (subtitle: string) => [
  { link: "/contact", subtitle, title: "Contact" },
];
const contactLinks = (subtitles: string[]) => [
  {
    link: "https://stackoverflow.com/users/6450931/alberto-perez",
    subtitle: subtitles[0],
    title: "Stackoverflow",
    target: "_blank",
  },
  {
    link: "https://www.linkedin.com/in/albertojpf/",
    subtitle: subtitles[1],
    title: "LinkedIn",
    target: "_blank",
  },
  {
    link: "https://github.com/albertoperezf",
    subtitle: subtitles[2],
    title: "Github",
    target: "_blank",
  },
  {
    link: "mailto:albertojperezf@gmail.com",
    subtitle: subtitles[3],
    title: "Email",
    target: "_blank",
  },
];

export default function Footer(): JSX.Element {
  const router = useRouter();
  const t = useTranslations("Footer");

  const generateLink = ({
    link,
    subtitle,
    target = "",
    title,
  }: {
    link: string;
    subtitle: string;
    target?: string;
    title: string;
  }): JSX.Element => (
    <Link
      key={title}
      href={link}
      className={styles.card}
      target={target}
      rel="noopener noreferrer"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{subtitle}</p>
    </Link>
  );

  return (
    <div className={styles.grid}>
      {(router.pathname === "/contact"
        ? contactLinks([
            t("stackoverflow"),
            t("linkedin"),
            t("github"),
            t("email"),
          ])
        : homeLinks(t("contact"))
      ).map((link) => generateLink(link))}
    </div>
  );
}
