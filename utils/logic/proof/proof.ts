import Sequent from '../sequent';
import Step, { ConclusionStep, PremiseStep } from './step';

export default class Proof {
  steps: Array<Step>;
  sequent: Sequent;
  complete: Boolean;
  constructor(sequent: Sequent) {
    this.sequent = sequent;
    this.complete = false;
    this.steps = [];
    this.sequent.premises.forEach((premise, i) =>
      this.steps.push(new PremiseStep(premise, i + 1))
    );
    this.steps.push(new ConclusionStep(this.sequent.conclusion));
  }

  isComplete() {
    for (const step of this.steps) {
      if (!step.lineNumber) {
        return false;
      }
    }
    return true;
  }

  applyStep(step: Step, stepIndex: number) {
    this.steps.splice(stepIndex, 0, step);
    this.complete = this.isComplete();
    if (step[stepIndex - 1].lineNumber) {
      step.lineNumber = stepIndex + 1;
      for (let i = stepIndex; i < this.steps.length; i++)
        this.steps[i].lineNumber += 1;
    }
  }
}
