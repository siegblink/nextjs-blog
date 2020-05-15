import Layout from '../components/Layout'

export default function About(props) {
  const { title, description, ...otherProps } = props

  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description}>
        <h1 className='title'>Welcome to my blog</h1>
        <p className='description'>{description}</p>
        <p>
          I am very exciting person. I know this because I'm following a very
          exciting tutorial, and a not exciting person wouldn't do that.
        </p>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
