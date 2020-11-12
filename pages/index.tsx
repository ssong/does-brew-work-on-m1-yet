import Head from 'next/head'
import styles from '../styles/Home.module.css'

const isReady = (state: string): boolean => state === 'closed'

export default function Home(props) {
  const { state } = props
  return (
    <div className={styles.container}>
      <Head>
        <title>Can I brew in M1?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Can I brew in M1?</h1>
        <h1
          className={`${styles.title} ${
            isReady(state) ? styles.yay : styles.nay
          }`}
        >
          <a
            href="https://github.com/Homebrew/brew/issues/7857"
            target="_blank"
            rel="noopener norefferer"
          >
            {isReady(state) ? "It's ready!" : 'Not yet.'}
          </a>
        </h1>

        <p className={styles.description}>
          There is also a REST endpoint at
          <code className={styles.code}>/api/can-i-brew</code> that will give
          you the above response in JSON.
        </p>

        <div className={styles.grid}>
          <a
            href="https://github.com/homebrew/brew/#donations"
            className={styles.card}
          >
            <h3>Sponsor Homebrew &rarr;</h3>
            <p>Support the awesome work that the Homebrew devs are doing.</p>
          </a>

          <a href="https://www.buymeacoffee.com/ssong" className={styles.card}>
            <h3>Buy me a coffee? &rarr;</h3>
            <p>If you're feeling generous, you can also buy me a coffee.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { body } = await fetch(
    'https://api.github.com/repos/Homebrew/brew/issues/7857'
  ).then((data) => data.json())
  return {
    props: { body }
  }
}
