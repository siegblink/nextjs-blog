import Head from 'next/Head'
import Header from './Header'

export default function Layout(props) {
  const { children, pageTitle, ...otherProps } = props

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{pageTitle}</title>
      </Head>
      <section className='layout'>
        <Header />
        <div className='content'>{children}</div>
      </section>
      <footer>Built by me</footer>
    </>
  )
}
