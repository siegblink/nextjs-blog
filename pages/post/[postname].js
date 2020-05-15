import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'

export default function BlogPost(props) {
  const { siteTitle, frontmatter, markdownBody } = props

  if (!frontmatter) return <></>

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
      <Link href='/'>
        <a>Back to post list</a>
      </Link>

      <article>
        <h1>{frontmatter.title}</h1>
        <p>By {frontmatter.author}</p>
        <div>
          <ReactMarkdown source={markdownBody} />
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticProps(props) {
  const { ...ctx } = props
  const { postname } = ctx.params

  const content = await import(`../../posts/${postname}.md`)
  const config = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  function generateSlugs(context) {
    const keys = context.keys()

    const data = keys.map(function (key, index) {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      return slug
    })

    return data
  }

  const blogSlugs = generateSlugs(require.context('../../posts', true, /\.md$/))

  const paths = blogSlugs.map(function (slug) {
    return `/post/${slug}`
  })

  return {
    paths,
    fallback: false,
  }
}
