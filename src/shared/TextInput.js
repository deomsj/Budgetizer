import React from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

export const OutlinedInput = props => (
  <TextField {...props} margin='normal' variant='outlined' />
);

export const UnderlinedInput = props => (
  <Input {...props} inputProps={{ 'aria-label': props.placeholder }} />
);

export const useTextInput = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  const updateValue = (event, resetValue = initialValue) => {
    if (event) {
      setValue(event.target.value);
    } else {
      setValue(resetValue);
    }
  };
  return [value, updateValue];
};
