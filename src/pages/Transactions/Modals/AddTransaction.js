import React, { useState } from 'react';
import * as types from 'types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { OutlinedInput, useTextInput } from 'shared/TextInput';
import { DatePicker } from '@material-ui/pickers';
import { TransitionUp, useStyles } from './helpers';

const AddTransaction = ({ user, actions }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [description, setDescription] = useTextInput();
  const [merchant, setMerchant] = useTextInput();
  const [amount, setAmount] = useTextInput();
  const [debit, setDebit] = useState(true);
  const [date, setDate] = useState(new Date());
  const [missingValues, setMissingValues] = useState('');

  const toggleDebit = event => setDebit(event.target.checked);

  const handleSubmit = () => {
    let missing = [];
    if (!description) missing.push('Description');
    if (!merchant) missing.push('Merchant');
    if (!amount) missing.push('Amount');

    if (missing.length) {
      setMissingValues(missing.join(', '));
    } else {
      actions.addTransaction({
        id: date.getTime(),
        user_id: user.id,
        description,
        merchant,
        debit,
        amount,
      });
      setDescription();
      setMerchant();
      setDebit(true);
      setAmount();
      closeDialog();
    }
  };

  return (
    <>
      <Tooltip
        title='Add Transaction'
        aria-label='Add Transaction'
        enterDelay={500}
        onClick={openDialog}>
        <Fab color='primary' size='small'>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={isOpen}
        TransitionComponent={TransitionUp}
        onClose={closeDialog}>
        <DialogTitle>New transaction</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DatePicker value={date} onChange={setDate} />
          <OutlinedInput
            id='description'
            label='Description'
            value={description}
            onChange={setDescription}
            placeholder='Description'
            fullWidth
            multiline
            autoFocus
          />
          <OutlinedInput
            id='merchant'
            label='Merchant'
            value={merchant}
            onChange={setMerchant}
            placeholder='Merchant'
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={debit}
                onChange={toggleDebit}
                value='Debit or Credit'
                color='primary'
              />
            }
            label={debit ? 'Debit' : 'Credit'}
            className={classes.switchContainer}
          />
          <OutlinedInput
            id='amount'
            label='Amount'
            value={amount}
            onChange={setAmount}
            placeholder='Amount'
            type='number'
            fullWidth
          />
          {missingValues && (
            <Typography
              variant='body1'
              component='p'
              align='center'
              color='error'>
              <b>Missing Values:</b>
              <br />
              {missingValues}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTransaction;

AddTransaction.propTypes = {
  user: types.user.isRequired,
  actions: types.actions.isRequired,
};
