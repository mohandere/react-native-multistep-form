export type TStepType = {
  isValid: boolean;
  data: object;
  isButtonClicked: boolean;
};

export type TStepsType = {
  [key: string]: TStepType;
};

export type TPropType = {};
export type TStateType = {
  activeStep: number;
  steps: TStepsType;
  isSubmitting: boolean;
};

export type IFormState = {
  isValid: boolean;
  data: object;
};

export type IFormProps = {
  onStepStateChange(stepId: string, newState: IFormState): void;
};