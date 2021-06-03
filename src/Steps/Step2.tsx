import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import { STEP_IDS } from '../config';

const Step2 = ({ onStepStateChange }) => {
  const [lastName, setLastName] = React.useState('');
  const [formValid, setFormValid] = React.useState(false);

  const onChangeText = (lastName) => {
    setLastName(lastName);
  };

  React.useEffect(() => {
    // Do validations and set form valid
    const isValid = true;
    setFormValid(isValid);
    onStepStateChange(STEP_IDS.step_02, {
      isValid,
      data: {
        lastName,
      },
    });
  }, [lastName]);

  return (
    <View>
      <Text style={{
        fontSize: 22,
      }}>Step 2</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder="Last Name"
        value={lastName}
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
export default Step2;
