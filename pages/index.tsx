import Head from 'next/head';

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>CISC 204 Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="text-xl">Welcome to the new CISC 204 tool!</h1>
        <p>
          <a href="https://github.com/EthanOrlander/cisc-204-tool">
            Help with development
          </a>
          <a href="www.notion.so/cisc204tool">Check the roadmap</a>
          <a href="">Join the conversation</a>
        </p>
      </header>
      <main>
        <section>
          <h2>Enter a sequent</h2>
          <form>
            <input />
            <button>Sign up</button>
          </form>
        </section>
      </main>

      <footer>
        <a
          href="https://github.com/EthanOrlander"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Ethan Orlander
        </a>
      </footer>
    </div>
  );
}
