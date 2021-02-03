import { removeWhitespace, topLevelIndex, unwrap } from './parseHelpers';

/**
 * All WFF constructors expect the formula to have no whitespace.
 */
export default abstract class WFF {
  formula: string;
  constructor(formula: string) {
    this.formula = formula;
  }
  toString() {
    return this.formula;
  }
  /**
   * Check if a formula is a valid WFF.
   * @param formula Formula to validate
   * @returns Boolean, whether or not the formula is a valid WFF
   */
  static validate(formula: string): boolean {
    const f = removeWhitespace(formula);
    return Atom.validate(f) || ComplexWFF.validate(f);
  }
  /**
   * WFF factory function. Creates & returns an Atom or a ComplexWFF.
   * @param formula Unsanitized formula to parse into a WFF.
   * @returns An Atom or a ComplexWFF
   * @throws An error if formula is neither a valid Atom nor ComplexWFF.
   */
  static parse(formula: string): Atom | ComplexWFF {
    const f = removeWhitespace(formula);
    if (Atom.validate(f)) return new Atom(f);
    if (ComplexWFF.validate(f)) return ComplexWFF.parse(f);
    throw Error(`'${formula}' is not a WFF.`);
  }
}

export class Atom extends WFF {
  identifier: string;
  constructor(formula: string) {
    super(formula);
    if (!Atom.validate(formula))
      throw Error(`Cannot create Atom from '${formula}'`);
    this.identifier = unwrap(formula);
  }
  static validate(formula: string): boolean {
    const f = unwrap(formula);
    return f.length === 1 && !!f.match(/[A-Z]/);
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
    super(unwrap(formula));
    this.operator = operator;
    this.operand1 = operand1;
    this.operand2 = operand2;
  }
  static validate(formula: string): boolean {
    return (
      Negation.validate(formula) ||
      Conjunction.validate(formula) ||
      Disjunction.validate(formula) ||
      MaterialImplication.validate(formula)
    );
  }
  /**
   * ComplexWFF factory function. Creates & returns an implementation of ComplexWFF.
   * @param formula Sanitized formula to parse into a ComplexWFF.
   * @returns An implementation of ComplexWFF.
   * @throws An error if forumla is not a valid ComplexWFF.
   */
  static parse(formula: string): ComplexWFF {
    if (Negation.validate(formula)) return new Negation(formula);
    if (Conjunction.validate(formula)) return new Conjunction(formula);
    if (Disjunction.validate(formula)) return new Disjunction(formula);
    if (MaterialImplication.validate(formula))
      return new MaterialImplication(formula);
    throw Error(`${formula} is not a ComplexWFF.`);
  }
}

export abstract class ComplexWFFInfix extends ComplexWFF {
  constructor(formula: string, operator: '∧' | '∨' | '→') {
    const f = unwrap(formula);
    const operatorIndex = topLevelIndex(f, operator);
    const operandStrings = [
      f.substring(0, operatorIndex),
      f.substring(operatorIndex + 1),
    ];
    const operand1 = WFF.parse(operandStrings[0]),
      operand2 = WFF.parse(operandStrings[1]);
    super(f, operator, operand1, operand2);
  }
  static generateValidator(operator: string): (formula: string) => boolean {
    return (formula: string) => {
      let f = unwrap(formula);
      const operatorIndex = topLevelIndex(f, operator);
      if (operatorIndex === -1) return false;
      const operandStrings = [
        f.substring(0, operatorIndex),
        f.substring(operatorIndex + 1),
      ];
      return WFF.validate(operandStrings[0]) && WFF.validate(operandStrings[1]);
    };
  }
}

export class ComplexWFFPrefix extends ComplexWFF {
  constructor(formula: string, operator: '¬') {
    const f = unwrap(formula);
    super(formula, operator, WFF.parse(f.substr(1)));
  }
  static generateValidator(operator: '¬'): (formula: string) => boolean {
    return (formula: string) => {
      let f = unwrap(formula);
      if (f.charAt(0) !== operator) return false;
      const operandStr = f.substr(1);
      return WFF.validate(operandStr);
    };
  }
}

export class Negation extends ComplexWFFPrefix {
  constructor(formula: string) {
    if (!Negation.validate(formula))
      throw Error(`Cannot create Negation from '${formula}'`);
    super(formula, '¬');
  }
  static validate = ComplexWFFPrefix.generateValidator('¬');
}

export class Conjunction extends ComplexWFFInfix {
  constructor(formula: string) {
    if (!Conjunction.validate(formula))
      throw Error(`Cannot create Conjunction from '${formula}'`);
    super(formula, '∧');
  }
  static validate = ComplexWFFInfix.generateValidator('∧');
  static from(a: WFF, b: WFF) {
    return new Conjunction(`(${unwrap(a.formula)}) ∧ (${unwrap(b.formula)})`);
  }
}

export class Disjunction extends ComplexWFFInfix {
  constructor(formula: string) {
    if (!Disjunction.validate(formula))
      throw Error(`Cannot create Disjunction from '${formula}'`);
    super(formula, '∨');
  }
  static validate = ComplexWFFInfix.generateValidator('∨');
}

export class MaterialImplication extends ComplexWFFInfix {
  constructor(formula: string) {
    if (!MaterialImplication.validate(formula))
      throw Error(`Cannot create MaterialImplication from '${formula}'`);
    super(formula, '→');
  }
  static validate = ComplexWFFInfix.generateValidator('→');
}
