import { parseSequent } from '../../../../utils/logic/sequent';
const util = require('util');

describe('a well formed seqeuent', () => {
  test('can be parsed', () => {
    const sequent = 'A, ((¬A) ∨ ((C → (¬B)) ∧ (¬B))), (¬C)⊢(C ∨ B)';
    console.log(
      util.inspect(parseSequent(sequent), false, null, true /* enable colors */)
    );
    expect(parseSequent(sequent)).toBeDefined();
  });
});
