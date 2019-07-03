import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

export const OutlinedInput = props => (
  <TextField {...props} margin='normal' variant='outlined' />
);

OutlinedInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export const UnderlinedInput = props => (
  <Input {...props} inputProps={{ 'aria-label': props.placeholder }} />
);

UnderlinedInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

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
