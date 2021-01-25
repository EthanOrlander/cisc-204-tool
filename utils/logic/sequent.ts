import { topLevelIndex } from './parseHelpers';
import { WFF, toWFF } from './wff';

/**
 * Parses a sequent into premises and a conclusion. Flags if the sequent is a theorem.
 * @param sequent The sequent to parse.
 */
export const parseSequent = (
  sequent: string
): { premises?: Array<WFF>; conclusion: WFF; isTheorem: boolean } => {
  let isTheorem: boolean, premises: Array<WFF>, conclusion: WFF;

  // Check if string contains ⊢ at top level
  const turnstileIndex = topLevelIndex(sequent, '⊢');
  if (turnstileIndex === -1)
    throw new Error(
      'sequent must contain a turnstile (⊢) at the top level of bracket depth'
    );
  // Check if valid theorem
  else if (turnstileIndex === 0) {
    premises = [];
    conclusion = toWFF(sequent.substring(1));
    isTheorem = true;
  }
  // Check if valid sequent
  else {
    premises = sequent
      .substring(0, turnstileIndex)
      .split(',')
      .map((premise) => toWFF(premise));
    conclusion = toWFF(sequent.substring(turnstileIndex + 1));
    isTheorem = false;
  }

  return { premises, conclusion, isTheorem };
};
