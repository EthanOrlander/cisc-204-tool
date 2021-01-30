import { useRouter } from 'next/router';
import { useState } from 'react';

import Page from '../components/Page';
import Sequent from '../utils/logic/sequent';

export default function Home() {
  const [sequent, setSequent] = useState('');
  const [error, setError] = useState<string>();
  const router = useRouter();
  const onSolveClick = (e) => {
    e.preventDefault();
    try {
      Sequent.parse(sequent);
      setError(null);
      router.push({
        pathname: 'solve',
        query: {
          sequent: encodeURIComponent(sequent),
        },
      });
    } catch (e) {
      setError(e.toString());
    }
  };
  const insertCharacter = (char: string) =>
    setSequent((prev) => [prev, char].join(''));
  const buttonClasses =
    'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4';
  return (
    <Page title="CISC 204 Tool">
      <main>
        <section>
          <h2 className="text-lg">Enter a sequent</h2>
          <form>
            <span className="text-sm text-red-500">{error}</span>
            <textarea
              className="border-black border-2 w-full"
              value={sequent}
              onChange={(e) => setSequent(e.target.value)}
            />
            <div className="mb-2 flex space-x-2">
              <button
                className={buttonClasses}
                onClick={(e) => {
                  e.preventDefault();
                  insertCharacter('¬');
                }}
              >
                ¬
              </button>
              <button
                className={buttonClasses}
                onClick={(e) => {
                  e.preventDefault();
                  insertCharacter('∨');
                }}
              >
                ∨
              </button>
              <button
                className={buttonClasses}
                onClick={(e) => {
                  e.preventDefault();
                  insertCharacter('∧');
                }}
              >
                ∧
              </button>
              <button
                className={buttonClasses}
                onClick={(e) => {
                  e.preventDefault();
                  insertCharacter('→');
                }}
              >
                →
              </button>
              <button
                className={buttonClasses}
                onClick={(e) => {
                  e.preventDefault();
                  insertCharacter('⊢');
                }}
              >
                ⊢
              </button>
            </div>
            <button
              className="bg-black text-white border-t-2 border-b-2 border-black inline-block px-2"
              onClick={onSolveClick}
            >
              Solve
            </button>
          </form>
        </section>
      </main>
    </Page>
  );
}
