import { parseSequent } from '../../../../utils/logic/sequent';

describe('a well formed seqeuent', () => {
  test('can be parsed', () => {
    const sequent = 'A, ((¬A) ∨ ((C → (¬B)) ∧ (¬B))), (¬C)⊢(C ∨ B)';
    expect(parseSequent(sequent)).toBeDefined();
  });
});

describe('a well formed theorem', () => {
  test('can be parsed', () => {
    const sequent = '⊢(C ∨ B)';
    expect(parseSequent(sequent)).toBeDefined();
  });
});
