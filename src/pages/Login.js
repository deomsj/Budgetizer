import React from 'react';
import * as types from 'types';
import Button from '@material-ui/core/Button';
import { OutlinedInput, useTextInput } from 'shared/TextInput.js';

const Login = ({ user, actions }) => {
  if (user) actions.logout();

  const [firstName, setFirstName] = useTextInput();
  const [lastName, setLastName] = useTextInput();
  const [dob, setDob] = useTextInput();

  const handleLogin = () =>
    actions.login(`${firstName}-/-${lastName}-/-${dob}`);

  return (
    <form className='login' noValidate autoComplete='off'>
      <OutlinedInput
        label='First Name'
        value={firstName}
        onChange={setFirstName}
        placeholder='First'
        autoFocus
      />
      <OutlinedInput
        label='Last Name'
        value={lastName}
        onChange={setLastName}
        placeholder='Last'
      />
      <OutlinedInput
        label='Date of Birth'
        value={dob}
        onChange={setDob}
        placeholder='DD/MM/YYYY'
        helperText='DD/MM/YYYY'
      />
      <Button
        className='login__button'
        variant='contained'
        onClick={handleLogin}>
        Login
      </Button>
    </form>
  );
};

export default Login;

Login.propTypes = {
  user: types.user,
  actions: types.actions,
};
