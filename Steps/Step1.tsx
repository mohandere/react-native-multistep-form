// @ts-nocheck

import * as React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import { STEP_IDS } from '../config';

const Step1 = ({ onStepSubmit }) => {
  const [state, setState] = React.useState({
    isValid: false,
    data: {
      firstName: '',
    },
  });

  const onChangeText = (firstName) => {
    const data = {
      firstName,
    };
    setState({
      data,
      isValid: isStepValid(data),
    });
  };

  const isStepValid = (data) => {
    return data.firstName ? true : false;
  };

  const onStepSubmitHandler = () => {
    // Do validate
    // call API
    // Call onStepSubmit
    const newState = {
      ...state,
      isValid: isStepValid(state.data),
    };
    setState(newState);
    onStepSubmit(STEP_IDS.step_01, newState);
  };

  const { data: { firstName }, isValid } = state;

  return (
    <View>
      <Text style={{
        fontSize: 22,
      }}>Step 1</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={'First Name'}
        value={firstName}
        placeholderTextColor="#000"
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 6,
        }}
      />
      <Text style={{color: '#ff0000'}}>{!isValid && 'Please enter all details!'}</Text>
      <TouchableOpacity onPress={onStepSubmitHandler} style={{ paddingTop: 10, paddingLeft: 20, width: 100, height: 60}}>
          <Text>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};
export default Step1;
