import * as React from 'react';
import { View, Button } from 'react-native';

import { STEP_IDS } from './config';
import AppIntroSlider from 'react-native-app-intro-slider';
import Stepper from './Stepper/Stepper'

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import { TPropType, TStateType } from './types';

const STEPS_MAPPING = [
  {
    id: STEP_IDS.step_01,
    component: Step1,
  },
  {
    id: STEP_IDS.step_02,
    component: Step2,
  },
  {
    id: STEP_IDS.step_03,
    component: Step3,
  },
];

const stepsCount = STEPS_MAPPING.length;
const lastStepIndex = stepsCount - 1;

const getValidIndex = (index: number) => {
  if (index < 0) {
    return 0;
  }
  if (index > lastStepIndex) {
    return lastStepIndex;
  }
  return index;
};

class ReactNativeMultiStepForm extends Component<TPropType, TStateType> {
  swiperRef: React.RefObject<AppIntroSlider | null> = React.createRef<null | AppIntroSlider>();

  constructor(props: TPropType) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: {
        [STEP_IDS.step_01]: {
          isValid: false,
          data: {},
        },
        [STEP_IDS.step_02]: {
          isValid: false,
          data: {},
        },
        [STEP_IDS.step_03]: {
          isValid: false,
          data: {},
        },
      },
      isSubmitting: false,
    };
  }

  componentDidUpdate(
    prevProps: TPropType,
    prevState: TStateType,
  ) {
    const { activeStep } = this.state;
    const { activeStep: prevActiveStep } = prevState;
    if (prevActiveStep !== activeStep) {
      setTimeout(() => {
        this.swiperRef.current?.goToSlide(activeStep);
        // this.swiperRef.current?.scrollTo(activeStep);
      }, 100);
    }
  }

  setActiveStep = (index: number) => {
    const validIndex = getValidIndex(index);
    this.setState({
      activeStep: validIndex,
    });
  };

  goToNextStep = () => {
    const { activeStep } = this.state;
    this.setActiveStep(activeStep + 1);
  };

  getStepIdByIndex = (index: number) => {
    const { steps } = this.state;
    return Object.keys(steps)[index];
  };

  getStepByIndex = (index: number) => {
    const stepId = this.getStepIdByIndex(index);
    const { steps } = this.state;
    return steps[stepId];
  };

  isStepValid = (index: number) => {
    const stepId = this.getStepIdByIndex(index);
    const { steps } = this.state;
    return steps[stepId].isValid;
  };

  onStepIconPress = (newIndex: number) => {
    const { activeStep } = this.state;
    const isActiveStepValid = this.isStepValid(activeStep);
    const isClickedStepValid = this.isStepValid(newIndex);
    if (isActiveStepValid || isClickedStepValid) {
      this.setActiveStep(newIndex);
    }
  };

  onStepStateChange = (stepId: string, newState: IFormState) => {
    const { steps } = this.state;
    if (steps[stepId].isValid === newState.isValid) {
      return;
    }
    this.setState((prevState) => ({
      steps: {
        ...prevState.steps,
        [stepId]: {
          ...newState,
        },
      },
    }));
  };

  onStepSubmit = (stepId: string) => {
    const { steps } = this.state;
    const stepState = steps[stepId];
    if (!stepState.isValid) {
      return;
    }
    this.setState(
      (prevState) => ({
        steps: {
          ...prevState.steps,
          [stepId]: {
            ...stepState,
          },
        },
      }),
      () => {
        this.goToNextStep();
      },
    );
  };

  onSlideChange = (newStepIndex: number) => {
    this.setActiveStep(newStepIndex);
  };

  renderItem = ({ item }: { item: { id: string; component: React.ReactNode } }) => {
    const Step = item.component;
    return <Step onStepStateChange={this.onStepStateChange} />;
  };

  render() {
    const { activeStep, steps, isSubmitting } = this.state;

    const currentStepId = this.getStepIdByIndex(activeStep);
    const currentStepState = steps[currentStepId];

    const stepsToRender = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index <= lastStepIndex; index++) {
      if (
        index === 0 ||
        this.isStepValid(index) ||
        this.isStepValid(index - 1)
      ) {
        stepsToRender.push(STEPS_MAPPING[index]);
      }
    }

    return (
      <>
        <View
          style={{ flex: 1 }}
          pointerEvents={isSubmitting ? 'none' : 'auto'}>
          <Stepper
            totalSteps={stepsCount}
            activeStep={activeStep}
            onStepIconPress={this.onStepIconPress}
          />
          <AppIntroSlider
            ref={this.swiperRef}
            renderItem={this.renderItem}
            data={stepsToRender}
            onSlideChange={this.onSlideChange}
            bottomButton={false}
            renderPagination={() => <></>}
            showPrevButton={false}
            showNextButton={false}
            showDoneButton={false}
          />
          <Button
            onPress={() => this.onStepSubmit(currentStepId)}
            disabled={!currentStepState.isValid || isSubmitting}>
            Continue
          </Button>
        </View>
      </>
    );
  }
}

export default ReactNativeMultiStepForm;
