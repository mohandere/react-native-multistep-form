// @ts-nocheck

import * as React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import { STEP_IDS } from '../config';

const Step3 = ({ onStepSubmit }) => {
  const [state, setState] = React.useState({
    isValid: false,
    data: {
      age: '',
    },
  });

  const onChangeText = age => {
    const data = {
      age,
    };
    setState({
      data,
      isValid: isStepValid(data),
    });
  };

  const isStepValid = (data) => {
    return data.age ? true : false;
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
    onStepSubmit(STEP_IDS.step_03, newState);
  }

  const { data: { age }, isValid } = state;
  return (
    <View>
      <Text style={{
        fontSize: 22,
      }}>Step 3</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={'Age'}
        value={age}
        placeholderTextColor="#000"
        style={{
          borderColor: "#ccc",
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
export default Step3;
