// @ts-nocheck

import * as React from 'react';
import { View } from 'react-native';

import { STEP_IDS } from './config';

import Steeper from './Steeper/Steeper';
import Swiper from './Swiper/Swiper';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

import styles from './styles';

const steps = [{
  id: STEP_IDS.step_01,
  component: Step1,
}, {
  id: STEP_IDS.step_02,
  component: Step2,
}, {
  id: STEP_IDS.step_03,
  component: Step3,
}];
const STEPS_COUNT = steps.length;
const MAX_STEP_INDEX = STEPS_COUNT - 1;

const getValidIndex = index => {
  if (index < 0) {
    return 0;
  }
  if (index > MAX_STEP_INDEX) {
    return MAX_STEP_INDEX;
  }
  return index;
};

const initialState = {
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
};

const ReactNativeMultiStepForm = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [state, setState] = React.useState(initialState);
    const swiperRef = React.useRef(null);

    const goToStep = (index) => {
      const validIndex = getValidIndex(index);
      setActiveStep(validIndex);
      setTimeout(() => {
        swiperRef.current.scrollTo(validIndex);
      }, 100);
    };

    const onSetActiveStep = index => {
      const validIndex = getValidIndex(index);
      setActiveStep(validIndex);
    };

    const goToNextStep = () => {
      onSetActiveStep(activeStep + 1);
      goToStep(activeStep + 1);
    };

    const onStepIconPress = newIndex => {
      if (isStepValid(newIndex)) {
        goToStep(newIndex);
      }
    };

    const onStepSubmit = (stepId, newState  = {}) => {
      setState(prevState => ({
        ...prevState,
        [stepId]: newState,
      }));
      if (newState.isValid) {
        goToNextStep();
      }
    };

    const onSlideChange = newStepIndex => {
      onSetActiveStep(newStepIndex);
    };

    const getStepIdByIndex = index => Object.keys(state)[index];

    const isStepValid = index => {
      const stepId = getStepIdByIndex(index);
      return state[stepId].isValid;
    };

    const stepsToRender = [];
    for (let i = 0; i <= MAX_STEP_INDEX; i++) {
      if (i <= activeStep || isStepValid(i)) {
        stepsToRender.push(steps[i]);
      }
    }

    return (
      <View style={{flex: 1}}>
        <Steeper totalSteps={STEPS_COUNT} activeStep={activeStep} onStepIconPress={onStepIconPress} />
        <Swiper ref={swiperRef}
          style={styles.wrapper}
          showsPagination={false}
          onIndexChanged={onSlideChange}
          loop={false}>
          {stepsToRender.map(step => {
            const Step = step.component;
            return <Step key={step.id} onStepSubmit={onStepSubmit} />;
          })}
        </Swiper>
      </View>
    );

};

export default ReactNativeMultiStepForm;
