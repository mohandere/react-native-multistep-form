import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import { STEP_IDS } from '../config';

const Step3 = ({ onStepStateChange }) => {
  const [dob, setDOB] = React.useState('');
  const [formValid, setFormValid] = React.useState(false);

  const onChangeText = (dob) => {
    setDOB(dob);
  };

  React.useEffect(() => {
    // Do validations and set form valid
    const isValid = true;
    setFormValid(isValid);
    onStepStateChange(STEP_IDS.step_03, {
      isValid,
      data: {
        dob,
      },
    });
  }, [dob]);

  return (
    <View>
      <Text style={{
        fontSize: 22,
      }}>Step 2</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder="Date of Birth"
        value={dob}
        placeholderTextColor="#000"
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 6,
        }}
      />
      <Text style={{color: '#ff0000'}}>{!formValid && 'This is required'}</Text>
    </View>
  );
};
export default Step3;
