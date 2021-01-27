import { Atom, ComplexWFF } from './wff';

describe('an Atom', () => {
  test('can be created from any capital letter', () => {
    const uppercaseAlphabet = [];
    for (let i = 0; i < 26; i++) {
      uppercaseAlphabet[i] = String.fromCharCode(65 + i);
    }
    uppercaseAlphabet.forEach((letter) =>
      expect(new Atom(letter)).toBeDefined()
    );
  });

  test('can be created from any capital letter in parentheses', () => {
    const uppercaseAlphabet = [];
    for (let i = 0; i < 26; i++) {
      uppercaseAlphabet[i] = String.fromCharCode(65 + i);
    }
    uppercaseAlphabet.forEach((letter) =>
      expect(new Atom(`(${letter})`)).toBeDefined()
    );
  });

  test('cannot be created from any lowercase letter', () => {
    const lowercaseAlphabet = [];
    for (let i = 0; i < 26; i++) {
      lowercaseAlphabet[i] = String.fromCharCode(97 + i);
    }
    lowercaseAlphabet.forEach((letter) =>
      expect(() => new Atom(letter)).toThrow(
        `Cannot create Atom from '${letter}'`
      )
    );
  });
});

describe('a ComplexWFF', () => {
  describe('can be a conjunction', () => {
    test('of Atoms', () => {
      const formula = 'A ∧ B';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
    test('of ComplexWFFs', () => {
      const formula = '((¬A) ∧ (¬B))';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
    test('of an Atom with a ComplexWFF', () => {
      const formula = '(A ∧ (¬B))';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
  });
  describe('can be a disjunction', () => {
    test('of Atoms', () => {
      const formula = 'A ∨ B';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
    test('of ComplexWFFs', () => {
      const formula = '((¬A) ∨ ((C → (¬B)) ∧ (¬B)))';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
    test('of an Atom with a ComplexWFF', () => {
      const formula = '(A ∨ ((C → (¬B)) ∧ (¬B)))';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
  });
  describe('can be a negation', () => {
    test('of an Atom', () => {
      const formula = '¬A';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
    test('of a ComplexWFF', () => {
      const formula = '(¬(¬A))';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
  });
  describe('can be a material implication', () => {
    test('of Atoms', () => {
      const formula = 'A → B';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
    test('of ComplexWFFs', () => {
      const formula = '((¬A) → (¬B))';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
    test('of an Atom with a ComplexWFF', () => {
      const formula = '(A → (¬B))';
      expect(ComplexWFF.parse(formula)).toBeDefined;
    });
  });
});
