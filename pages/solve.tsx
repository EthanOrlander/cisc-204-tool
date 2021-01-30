import { useRouter } from 'next/router';
import Page from '../components/Page';
import Error from '../components/Error';
import { useState, useEffect } from 'react';
import Sequent, { Theorem } from '../utils/logic/sequent';
import Proof from '../components/Proof';

const Solve = () => {
  const [error, setError] = useState<string | null>(null);
  const [sequentString, setSequentString] = useState<string>(null);
  const [sequent, setSequent] = useState<Sequent>(null);
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { sequent: rawSequent } = router.query;
  useEffect(() => {
    //  For some reason, rawSequent starts null when you go to solve url directly so I have to just return here.
    if (!rawSequent) return;
    if (Array.isArray(rawSequent))
      setError('You must provide a valid sequent.');
    else if (!rawSequent) setError('You must provide a sequent.');
    else setSequentString(decodeURIComponent(rawSequent));
  }, [rawSequent]);
  useEffect(() => {
    if (sequentString) setSequent(Sequent.parse(sequentString));
  }, [sequentString]);
  useEffect(() => {
    if (!!error && typeof window !== 'undefined')
      setTimeout(() => router.push('/'), 3000);
  }, [error]);
  useEffect(() => {
    if (sequent) {
      console.log('Sequent:', sequent);
      const prefix = sequent instanceof Theorem ? 'Theorem' : 'Sequent';
      setTitle(`${prefix}: ${sequentString}`);
    }
  }, [sequent]);
  return (
    <Page title={`CISC 204 Tool | Prove ${sequentString}`} hasBackButton>
      {error && <Error msg={error} willRedirect />}
      {sequent && (
        <section>
          <h3>{title}</h3>
          <Proof sequent={sequent} />
        </section>
      )}
    </Page>
  );
};

export default Solve;
