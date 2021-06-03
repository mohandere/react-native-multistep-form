import React from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';
import { Svg, Circle, G, Path, Rect } from 'react-native-svg';
import { LineWrapper, StepContainer, StepIconWrapper } from './StepIcon.styles';
const getStepIcon = (isActiveStep, isCompletedStep) => {
    if (isActiveStep) {
        return (<Svg width="42" height="42" viewBox="0 0 42 42">
        <G fill="none" fillRule="evenodd">
          <G>
            <G transform="translate(-24 -56) translate(24 56)">
              <Circle cx="21" cy="21" r="20.5" stroke="#0064CC" strokeOpacity=".4"/>
              <G fill="#0164CC" transform="translate(6 6.002)">
                <Rect width="30" height="30" rx="15"/>
              </G>
            </G>
          </G>
        </G>
      </Svg>);
    }
    if (isCompletedStep) {
        return (<Svg width="42" height="42" viewBox="0 0 42 42">
        <G fill="none" fillRule="evenodd">
          <G>
            <G transform="translate(-24 -122) translate(24 122)">
              <G fill="#0164CC" transform="translate(6 6)">
                <Rect width="30" height="30" rx="15"/>
              </G>
              <Circle cx="21" cy="21" r="21"/>
              <G stroke="#FFF" strokeLinecap="square">
                <G>
                  <Path d="M0.689 5.191L3.94 8.442 12.068 0.315" transform="translate(8.752 9) translate(5.835 8)"/>
                </G>
              </G>
            </G>
          </G>
        </G>
      </Svg>);
    }
    return (<Svg width="42" height="42" viewBox="0 0 42 42">
      <G fill="none" fillRule="evenodd">
        <G>
          <G>
            <G fill="#80B2E6" opacity=".503" transform="translate(-24 -188) translate(24 188) translate(11 11)">
              <Rect width="20" height="20" rx="10"/>
            </G>
          </G>
        </G>
      </G>
    </Svg>);
};
export const StepIcon = ({ isActiveStep, isCompletedStep, label, activeLabelColor = '#4BB543', activeLabelFontSize, borderStyle = 'solid', borderWidth = 2, completedProgressBarColor = "#06bcee", completedLabelColor = 'lightgray', labelFontFamily, labelColor = 'lightgray', labelFontSize = 14, progressBarColor = colors.lightBlue[100], isLastStep, stepIndex, onIconPress, }) => {
    let styles;
    const rightBarStyle = {
        width: '100%',
        borderStyle,
        borderTopWidth: borderWidth,
    };
    const labelStyle = {
        textAlign: 'center',
        flexWrap: 'wrap',
        fontFamily: labelFontFamily,
        marginTop: 8,
    };
    if (isActiveStep) {
        styles = {
            labelText: Object.assign(Object.assign({}, labelStyle), { color: activeLabelColor, fontSize: activeLabelFontSize || labelFontSize }),
            rightBar: Object.assign(Object.assign({}, rightBarStyle), { borderTopColor: completedProgressBarColor }),
        };
    }
    else if (isCompletedStep) {
        styles = {
            labelText: Object.assign(Object.assign({}, labelStyle), { color: completedLabelColor, fontSize: labelFontSize }),
            rightBar: Object.assign(Object.assign({}, rightBarStyle), { borderTopColor: completedProgressBarColor }),
        };
    }
    else {
        styles = {
            labelText: Object.assign(Object.assign({}, labelStyle), { color: labelColor, fontSize: labelFontSize }),
            rightBar: Object.assign(Object.assign({}, rightBarStyle), { borderStyle: 'dotted', borderTopColor: progressBarColor }),
        };
    }
    const onPressStepIcon = () => onIconPress(stepIndex);
    return (<StepContainer isLastStep={isLastStep}>
      <StepIconWrapper>
        <TouchableOpacity testID="stepIcon" onPress={onPressStepIcon}>
          {getStepIcon(isActiveStep, isCompletedStep)}
        </TouchableOpacity>
        {!isLastStep && (<LineWrapper>
            <View style={styles.rightBar}/>
          </LineWrapper>)}
      </StepIconWrapper>
      <Text style={styles.labelText}>{label}</Text>
    </StepContainer>);
};
