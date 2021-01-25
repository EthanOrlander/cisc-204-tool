import { sanitize, topLevelIndex } from './parseHelpers';

export abstract class WFF {
  formula: string;
  constructor(formula: string) {
    this.formula = formula;
  }
  abstract toString(): string;
}

export class Atom extends WFF {
  identifier: string;
  constructor(formula: string) {
    super(sanitize(formula));
    if (!Atom.validate(formula))
      throw Error(`Cannot create Atom from formula '${formula}'`);
    // Strip any parentheses
    this.identifier = formula.replace(/[\])[(]/g, '');
  }
  toString() {
    return `${this.identifier}`;
  }
  static validate(formula: string): boolean {
    const sanitized = sanitize(formula);
    return sanitized.length === 1 && !!sanitized.match(/[A-Z]/);
  }
}

export abstract class ComplexWFF extends WFF {
  operator: '¬' | '∧' | '∨' | '→';
  operand1: WFF;
  operand2?: WFF;
  constructor(
    formula: string,
    operator: '¬' | '∧' | '∨' | '→',
    operand1: WFF,
    operand2?: WFF
  ) {
    super(sanitize(formula));
    this.operator = operator;
    this.operand1 = operand1;
    this.operand2 = operand2;
  }
  toString() {
    return '';
  }
  static validate(formula: string): boolean {
    return (
      Negation.validate(formula) ||
      Conjunction.validate(formula) ||
      Disjunction.validate(formula) ||
      MaterialImplication.validate(formula)
    );
  }
}

export class Negation extends ComplexWFF {
  constructor(formula: string) {
    if (!Negation.validate(formula))
      throw Error(`Cannot create Negation from formula '${formula}'`);
    const sanitized = sanitize(formula);
    // If the formula passed validation, then we know the unwrapped formula is of the form `¬WFF`
    super(sanitize(formula), '¬', toWFF(sanitized.substr(1)));
  }
  static validate(formula: string): boolean {
    let sanitized = sanitize(formula);
    if (sanitized.charAt(0) !== '¬') return false;
    const operandStr = sanitized.substr(1);
    return validateWFF(operandStr);
  }
}

export class Conjunction extends ComplexWFF {
  constructor(formula: string) {
    if (!Conjunction.validate(formula))
      throw Error(`Cannot create Conjunction from formula '${formula}'`);
    const sanitized = sanitize(formula);
    const conjunctionIndex = topLevelIndex(sanitized, '∧');
    const operandStrings = [
      sanitized.substring(0, conjunctionIndex),
      sanitized.substring(conjunctionIndex + 1),
    ];
    // If the formula passed validation, then we know the unwrapped formula is of the form `WFF → WFF`
    super(
      sanitize(formula),
      '∧',
      toWFF(operandStrings[0]),
      toWFF(operandStrings[1])
    );
  }
  static validate(formula: string): boolean {
    let sanitized = sanitize(formula);
    const conjunctionIndex = topLevelIndex(sanitized, '∧');
    if (conjunctionIndex === -1) return false;
    const operandStrings = [
      sanitized.substring(0, conjunctionIndex),
      sanitized.substring(conjunctionIndex + 1),
    ];
    return validateWFF(operandStrings[0]) && validateWFF(operandStrings[1]);
  }
}

export class Disjunction extends ComplexWFF {
  constructor(formula: string) {
    if (!Disjunction.validate(formula))
      throw Error(`Cannot create Disjunction from formula '${formula}'`);
    const sanitized = sanitize(formula);
    const disjunctionIndex = topLevelIndex(sanitized, '∨');
    const operandStrings = [
      sanitized.substring(0, disjunctionIndex),
      sanitized.substring(disjunctionIndex + 1),
    ];
    // If the formula passed validation, then we know the unwrapped formula is of the form `WFF → WFF`
    super(
      sanitize(formula),
      '∨',
      toWFF(operandStrings[0]),
      toWFF(operandStrings[1])
    );
  }
  static validate(formula: string): boolean {
    let sanitized = sanitize(formula);
    const disjunctionIndex = topLevelIndex(sanitized, '∨');
    if (disjunctionIndex === -1) return false;
    const operandStrings = [
      sanitized.substring(0, disjunctionIndex),
      sanitized.substring(disjunctionIndex + 1),
    ];
    return validateWFF(operandStrings[0]) && validateWFF(operandStrings[1]);
  }
}

export class MaterialImplication extends ComplexWFF {
  constructor(formula: string) {
    if (!MaterialImplication.validate(formula))
      throw Error(
        `Cannot create MaterialImplication from formula '${formula}'`
      );
    const sanitized = sanitize(formula);
    const materialImplicationIndex = topLevelIndex(sanitized, '→');
    const operandStrings = [
      sanitized.substring(0, materialImplicationIndex),
      sanitized.substring(materialImplicationIndex + 1),
    ];
    // If the formula passed validation, then we know the unwrapped formula is of the form `WFF → WFF`
    super(
      sanitize(formula),
      '→',
      toWFF(operandStrings[0]),
      toWFF(operandStrings[1])
    );
  }
  static validate(formula: string): boolean {
    let sanitized = sanitize(formula);
    const materialImplicationIndex = topLevelIndex(sanitized, '→');
    if (materialImplicationIndex === -1) return false;
    const operandStrings = [
      sanitized.substring(0, materialImplicationIndex),
      sanitized.substring(materialImplicationIndex + 1),
    ];
    return validateWFF(operandStrings[0]) && validateWFF(operandStrings[1]);
  }
}

/**
 * WFF factory function. Creates & returns either an Atom or a ComplexWFF.
 * @param formula Formula to parse into a WFF.
 * @returns An Atom or a ComplexWFF
 * @throws An error if formula is neither a valid Atom nor ComplexWFF.
 */
export const toWFF = (formula: string): Atom | ComplexWFF => {
  if (Atom.validate(formula)) return new Atom(formula);
  if (ComplexWFF.validate(formula)) return toComplexWFF(formula);
  throw Error(`formula '${formula}' is not a WFF.`);
};

/**
 * Check if a formula is a valid WFF.
 * @param formula Formula to validate
 * @returns Boolean, whether or not the formula is a valid WFF
 */
export const validateWFF = (formula: string): boolean =>
  Atom.validate(formula) || ComplexWFF.validate(formula);

/**
 * ComplexWFF factory function. Creates & returns an implementation of ComplexWFF.
 * @param formula Formula to parse into a ComplexWFF.
 * @returns An implementation of ComplexWFF.
 * @throws An error if forumla is not a valid ComplexWFF.
 */
const toComplexWFF = (formula: string): ComplexWFF => {
  if (Negation.validate(formula)) return new Negation(formula);
  if (Conjunction.validate(formula)) return new Conjunction(formula);
  if (Disjunction.validate(formula)) return new Disjunction(formula);
  if (MaterialImplication.validate(formula))
    return new MaterialImplication(formula);
  // Do the same for conjunction, disjunction, and material implication
  throw Error(`formula ${formula} is not a ComplexWFF.`);
};
