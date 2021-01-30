import { removeWhitespace, topLevelIndex } from './parseHelpers';
import WFF from './wff';

export default class Sequent {
  premises?: Array<WFF>;
  conclusion: WFF;
  constructor(premises: Array<WFF> | undefined, conclusion: WFF) {
    this.premises = premises;
    this.conclusion = conclusion;
  }
  static parse(sequent: string): Sequent | Theorem {
    const s = removeWhitespace(sequent);
    const turnstileIndex = topLevelIndex(s, '⊢');
    if (turnstileIndex === -1)
      throw new Error(
        'Sequent must contain a turnstile (⊢) at the top level of bracket depth'
      );
    const conclusion = WFF.parse(s.substring(turnstileIndex + 1));
    if (turnstileIndex === 0) return new Theorem(conclusion);
    const premises = s.substring(0, turnstileIndex).split(',').map(WFF.parse);
    return new Sequent(premises, conclusion);
  }
}

export class Theorem extends Sequent {
  constructor(conclusion: WFF) {
    super(undefined, conclusion);
  }
}
