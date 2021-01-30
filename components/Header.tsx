import { useRouter } from 'next/router';

type HeaderProps = {
  hasBackButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({ hasBackButton }) => {
  const router = useRouter();
  return (
    <header>
      <h1 className="text-xl">Welcome to the new CISC 204 tool!</h1>
      <p>
        <a href="https://github.com/EthanOrlander/cisc-204-tool">
          Help with development
        </a>
        <br />
        <a href="https://www.notion.so/cisc204tool">Check the roadmap</a>
        <br />
        <a href="" target="_blank" rel="noopener">
          Join the conversation
        </a>
      </p>
      {hasBackButton && (
        <div className="inline-flex">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={router.back}
          >
            Back
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
