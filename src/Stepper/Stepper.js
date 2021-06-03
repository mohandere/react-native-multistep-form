import * as React from 'react';
import { StepIcon } from './StepIcon';
import { StepperContainer } from './Stepper.styles';
const Stepper = ({ isComplete = false, activeStep = 0, onStepIconPress, totalSteps, }) => {
    const onIconPress = (newIndex) => {
        onStepIconPress(newIndex);
    };
    const renderStepIcons = () => {
        const steps = [];
        for (let i = 0; i < totalSteps; i += 1) {
            const isCompletedStep = isComplete ? true : i < activeStep;
            const isActiveStep = isComplete ? false : i === activeStep;
            steps.push(<React.Fragment key={i}>
          <StepIcon stepIndex={i} isLastStep={i === totalSteps - 1} isCompletedStep={isCompletedStep} isActiveStep={isActiveStep} onIconPress={onIconPress}/>
        </React.Fragment>);
        }
        return steps;
    };
    return <StepperContainer>{renderStepIcons()}</StepperContainer>;
};

export default Stepper;