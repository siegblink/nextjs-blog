import { Fragment } from "react";
import Head from "next/Head";
import Header from "@/components/header";
import classes from "./layout.module.css";

export default function Layout(props) {
  const { children, pageTitle } = props;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>

      {/* Main content */}
      <section className={classes.layout}>
        <Header />
        <div id="blog-content">{children}</div>
      </section>

      {/* Footer */}
      <footer className={classes.footer}>Built with ❤️ by me</footer>
    </Fragment>
  );
}
