import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import { STEP_IDS } from '../config';

const Step1 = ({ onStepStateChange }) => {
  const [firstName, setFirstName] = React.useState('');
  const [formValid, setFormValid] = React.useState(false);

  const onChangeText = (firstName) => {
    setFirstName(firstName);
  };

  React.useEffect(() => {
    // Do validations and set form valid
    const isValid = true;
    setFormValid(isValid);
    onStepStateChange(STEP_IDS.step_01, {
      isValid,
      data: {
        firstName,
      },
    });
  }, [firstName]);

  return (
    <View>
      <Text style={{
        fontSize: 22,
      }}>Step 1</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder="First Name"
        value={firstName}
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
export default Step1;
