import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/layout";
import classes from "./[postname].module.css";

export default function BlogPost(props) {
  const { siteTitle, frontmatter, markdownBody } = props;

  if (!frontmatter) return <></>;

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
      <Link href="/">
        <a className={classes.backLink}>← Back to Post List</a>
      </Link>

      <article>
        {/* Title */}
        <h1 className={classes.title}>{frontmatter.title}</h1>

        {/* Author */}
        <p className={classes.author}>By: {frontmatter.author}</p>

        {/* Blog content */}
        <div className={classes.content}>
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { postname } = context.params;

  // Get the markdown content.
  const content = await import(`../../posts/${postname}.md`);

  // Get the site configuration content.
  const config = await import(`siteconfig.json`);

  // Get the parsed markdown data.
  const { data, content: markdownContent } = matter(content.default);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data,
      markdownBody: markdownContent,
    },
  };
}

export async function getStaticPaths() {
  // Get the slugs array data.
  const blogSlugs = generateSlugs(
    require.context("../../posts", true, /\.md$/)
  );

  // Generate an array of paths.
  const paths = blogSlugs.map((slug) => {
    return `/post/${slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export function generateSlugs(context) {
  // Get the keys array data.
  const keys = context.keys();

  // Generate slugs array data.
  const data = keys.map((key) => {
    let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
    return slug;
  });

  return data;
}
