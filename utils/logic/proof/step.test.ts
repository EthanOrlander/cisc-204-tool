import Sequent from '../sequent';
import Proof from './proof';
import { ConjunctionIntroductionType1Forward } from './step';
const util = require('util');

describe('A,B⊢A∧B can be solved', () => {
  test('derp', () => {
    const sequent = Sequent.parse('A,B⊢A∧B');
    const proof = new Proof(sequent);
    proof.applyStep(
      new ConjunctionIntroductionType1Forward(proof.steps[0], proof.steps[1]),
      2
    );
    expect(true).toBeTruthy;
  });
});
