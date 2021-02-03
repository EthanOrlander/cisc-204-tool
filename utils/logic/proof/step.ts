import Proof from './proof';
import WFF, { Atom, Conjunction } from '../wff';

type Direction = 'BACKWARD' | 'FORWARD';

export default abstract class Step {
  static direction: Direction;
  abstract explanation(): string;
  formula: WFF;
  lineNumber?: number;
  static validate: (proof: Proof, ...args: Array<Step>) => boolean;
  static apply: (proof: Proof, ...args: Array<Step>) => void;
}

// export class Assumption extends Step {
//   premise: WFF;
//   conclusion: WFF;
//   steps: Array<Step>;
// }

export class PremiseStep extends Step {
  constructor(formula: WFF, lineNumber: number) {
    super();
    this.formula = formula;
    this.lineNumber = lineNumber;
  }
  explanation() {
    return 'premise';
  }
}

export class ConclusionStep extends Step {
  constructor(formula: WFF) {
    super();
    this.formula = formula;
  }
  explanation() {
    return '';
  }
}

// export class ConjunctionEliminationType1 extends Step {}
// export class ConjunctionEliminationType2 extends Step {}

export class ConjunctionIntroductionType1Forward extends Step {
  a: Step;
  b: Step;
  static direction = 'FORWARD' as Direction;
  constructor(a: Step, b: Step) {
    super();
    this.a = a;
    this.b = b;
    this.formula = Conjunction.from(a.formula, b.formula);
  }
  explanation() {
    return `${this.a.lineNumber}, ${this.b.lineNumber} ∧ introduction`;
  }
}

// export class ConjunctionIntroductionType2Forward extends Step {}
// export class ConjunctionIntroductionType1Backward extends Step {}
// export class ConjunctionIntroductionType2Backward extends Step {}

// export class ImplicationIntroduction extends Step {}
// export class ImplicationElimination extends Step {}
// export class ModusTollens extends Step {}

// export class DoubleNegationIntroduction extends Step {}
// export class DoubleNegationElimination extends Step {}

// export class NegationElimination extends Step {}
// export class BottomElimination extends Step {} // This is contra(constructive) in Jape
// export class PBC extends Step {}

// export class NegationIntroduction extends Step {}

// export class DisjunctionIntroductionForwardType1 extends Step {}
// export class DisjunctionIntroductionForwardType2 extends Step {}
// export class DisjunctionIntroductionBackwardType1 extends Step {}
// export class DisjunctionIntroductionBackwardType2 extends Step {}

// export class LEM extends Step {}
// export class DisjunctionElimination extends Step {}

// export class Copy extends Step {}
