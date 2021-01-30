import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

type PageProps = {
  title: string;
  hasBackButton?: boolean;
};

const Page: React.FC<PageProps> = ({ hasBackButton, title, children }) => (
  <div className="container mx-auto">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header hasBackButton={hasBackButton} />
    {children}
    <Footer />
  </div>
);

export default Page;
