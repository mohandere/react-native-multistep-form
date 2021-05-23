// @ts-nocheck

import * as React from 'react';
import { View, PanResponder, Animated, Text, StyleSheet } from 'react-native';
import StepIcon from './StepIcon'

const styles = {
  stepIcons: {
    position: 'relative',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
  },
};

const Steeper = (props) => {
  const { isComplete = false, activeStep = 0, onStepIconPress, totalSteps } = props;

  const onIconPress = (newIndex) => {
    onStepIconPress(newIndex);
  };

  const renderStepIcons = () => {
    let step = [];
    for (let i = 0; i < totalSteps; i++) {
      const isCompletedStep = isComplete ? true : i < activeStep;
      const isActiveStep = isComplete ? false : i === activeStep;
      step.push(
        <View key={i}>
          <View>
            <StepIcon
              stepCount={totalSteps}
              stepNum={i + 1}
              stepIndex={i}
              isFirstStep={i === 0}
              isLastStep={i === totalSteps - 1}
              isCompletedStep={isCompletedStep}
              isActiveStep={isActiveStep}
              onIconPress={onIconPress}
            />
          </View>
        </View>
      );
    }
    return step;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.stepIcons}>
        {renderStepIcons()}
      </View>
    </View>
  );
};

export default Steeper;