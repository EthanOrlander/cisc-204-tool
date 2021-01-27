import { removeWhitespace, topLevelIndex } from './parseHelpers';
import { WFF } from './wff';

export type Sequent = {
  premises?: Array<WFF>;
  conclusion: WFF;
  isTheorem: boolean;
};

/**
 * Parses a sequent into premises and a conclusion. Flags if the sequent is a theorem.
 * @param sequent The sequent to parse.
 */
export const parseSequent = (sequent: string): Sequent => {
  let isTheorem: boolean, premises: Array<WFF>, conclusion: WFF;
  const s = removeWhitespace(sequent);
  // Check if string contains ⊢ at top level
  const turnstileIndex = topLevelIndex(s, '⊢');
  if (turnstileIndex === -1)
    throw new Error(
      'sequent must contain a turnstile (⊢) at the top level of bracket depth'
    );
  // Parse as a theorem
  if (turnstileIndex === 0) {
    premises = [];
    conclusion = WFF.parse(s.substring(1));
    isTheorem = true;
  }
  // Parse as a sequent (idk the right terminology)
  else {
    premises = s
      .substring(0, turnstileIndex)
      .split(',')
      .map((premise) => WFF.parse(premise));
    conclusion = WFF.parse(s.substring(turnstileIndex + 1));
    isTheorem = false;
  }

  return { premises, conclusion, isTheorem };
};
