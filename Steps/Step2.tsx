// @ts-nocheck

import * as React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import { STEP_IDS } from '../config';


const Step2 = ({ onStepSubmit }) => {
  const [state, setState] = React.useState({
    isValid: false,
    data: {
      lastName: '',
    },
  });

  const onChangeText = (lastName) => {
    const data = {
      lastName,
    };
    setState({
      data,
      isValid: isStepValid(data),
    });
  };

  const isStepValid = (data) => {
    return data.lastName ? true : false;
  };

  const onStepSubmitHandler = () => {
    // Do validate
    const newState = {
      ...state,
      isValid: isStepValid(state.data),
    };
    setState(newState);
    // call API
    // Update global state
    onStepSubmit(STEP_IDS.step_02, newState);
  }

  const { data: { lastName }, isValid } = state;
  return (
    <View>
      <Text style={{
        fontSize: 22,
      }}>Step 2</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={'Last Name'}
        value={lastName}
        placeholderTextColor="#000"
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 6,
        }}
      />
      <Text style={{color: '#ff0000'}}>{!isValid && 'Please enter all details!'}</Text>
      <TouchableOpacity onPress={onStepSubmitHandler}  style={{ paddingTop: 10, paddingLeft: 20, width: 100, height: 60}}>
          <Text>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};
export default Step2;
