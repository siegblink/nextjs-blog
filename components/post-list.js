import Link from "next/link";
import classes from "./post-list.module.css";

export default function PostList(props) {
  const { posts } = props;

  if (posts === null) {
    return null;
  }

  return !posts ? (
    <div>No posts.</div>
  ) : (
    <ul className={classes.list}>
      {posts.map((post) => {
        return (
          <li key={post.slug} className={classes.listItem}>
            <Link href={{ pathname: `/post/${post.slug}` }}>
              <a className={classes.link}>{post.frontmatter.title}</a>
            </Link>
            <p>By: {post.frontmatter.author}</p>
          </li>
        );
      })}
    </ul>
  );
}
