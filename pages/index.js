import * as matter from "gray-matter";
import Layout from "@/components/layout";
import PostList from "@/components/post-list";
import classes from "./index.module.css";

export default function Index(props) {
  const { posts, title, description } = props;

  return (
    <Layout pageTitle={title}>
      {/* Heading */}
      <h1 className={classes.title}>Welcome to my blog</h1>

      {/* Sub-heading */}
      <p className={classes.description}>{description}</p>

      {/* Content */}
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  );
}

export function getPosts(context) {
  const keys = context.keys();
  const values = keys.map(context);

  const data = keys.map((key, index) => {
    // Generate slug.
    const slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);

    // Extract value based on the given index.
    const value = values[index];

    // Generate document data.
    const document = matter(value.default);

    return {
      frontmatter: document.data,
      markdownBody: document.content,
      slug,
    };
  });

  return data;
}

export async function getStaticProps() {
  // Get the configuration data.
  const configData = await import(`siteconfig.json`);

  // Get the posts data.
  const posts = getPosts(require.context("posts", true, /\.md$/));

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
