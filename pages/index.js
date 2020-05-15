import matter from 'gray-matter'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

export default function Index(props) {
  const { posts, title, description, ...otherProps } = props

  return (
    <Layout pageTitle={title}>
      <h1 className='title'>Welcome to my blog</h1>
      <p className='description'>{description}</p>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  function getPosts(context) {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map(function (key, index) {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)

      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })

    return data
  }

  const posts = getPosts(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
