import Sequent, { Theorem } from './sequent';

describe('a well formed seqeuent', () => {
  test('can be parsed', () => {
    const sequent = 'A, ((¬A) ∨ ((C → (¬B)) ∧ (¬B))), (¬C)⊢(C ∨ B)';
    expect(Sequent.parse(sequent)).toBeDefined();
  });
});

describe('a well formed theorem', () => {
  test('can be parsed', () => {
    const sequent = '⊢(C ∨ B)';
    expect(Sequent.parse(sequent) instanceof Theorem).toBeTruthy();
  });
});
