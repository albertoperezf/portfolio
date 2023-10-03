import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const homeLinks = [
  { link: "/contact", subtitle: "Some ways to reach me.", title: "Contact" },
];
const contactLinks = [
  {
    link: "https://stackoverflow.com/users/6450931/alberto-perez",
    subtitle: `Find my interactions in the world's biggest developer platform.`,
    title: "Stackoverflow",
    target: "_blank",
  },
  {
    link: "https://www.linkedin.com/in/albertojpf/",
    subtitle: "Learn more about my professional trajectory.",
    title: "LinkedIn",
    target: "_blank",
  },
  {
    link: "https://github.com/albertoperezf",
    subtitle: "Check out some of my personal work (including this portfolio).",
    title: "Github",
    target: "_blank",
  },
  {
    link: "mailto:albertojperezf@gmail.com",
    subtitle: "Contact directly with me.",
    title: "Email",
    target: "_blank",
  },
];

export default function Footer(): JSX.Element {
  const router = useRouter();

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
      {(router.pathname === "/contact" ? contactLinks : homeLinks).map((link) =>
        generateLink(link),
      )}
    </div>
  );
}
