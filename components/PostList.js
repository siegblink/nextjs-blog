import Link from 'next/link'

export default function PostList(props) {
  const { posts } = props

  if (posts === null) return null

  return (
    <div>
      {!posts && <div>No posts.</div>}
      <ul>
        {posts &&
          posts.map(function (post) {
            return (
              <li key={post.slug}>
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <a>{post.frontmatter.title}</a>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
