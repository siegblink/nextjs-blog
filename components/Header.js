import Link from "next/link";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link href="/">
          <a>My blog</a>
        </Link>

        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
}
