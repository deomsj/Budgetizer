import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { OutlinedInput, useTextInput } from '../../../shared/TextInput';

const EditTransaction = ({ transaction, actions }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [description, setDescription] = useTextInput(transaction.description);
  const [merchant, setMerchant] = useTextInput(transaction.merchant);
  const [amount, setAmount] = useTextInput(transaction.amount);
  const [debit, setDebit] = useState(transaction.debit);
  const [missingValues, setMissingValues] = useState('');

  const selectDebit = event => setDebit(event.target.checked);

  const handleCancel = () => {
    setDescription(null, transaction.description);
    setMerchant(null, transaction.merchant);
    setAmount(null, transaction.amount);
    setDebit(transaction.debit);
    closeDialog();
  };

  const handleSubmit = () => {
    let missing = [];
    if (!description) missing.push('Description');
    if (!merchant) missing.push('Merchant');
    if (!amount) missing.push('Amount');

    if (missing.length) {
      setMissingValues(missing.join(', '));
    } else {
      actions.editTransaction({
        ...transaction,
        description,
        merchant,
        debit,
        amount,
      });
      closeDialog();
    }
  };

  return (
    <>
      <Tooltip
        title='Add Transaction'
        aria-label='Add Transaction'
        enterDelay={500}
        onClick={openDialog}
        className={classes.trigger}>
        <Fab color='primary' size='small' margin='small'>
          <EditIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        onClose={closeDialog}>
        <DialogTitle>New transaction</DialogTitle>
        <DialogContent className={classes.dialogContent}>
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
                onChange={selectDebit}
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
          <Button onClick={handleCancel} color='primary'>
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

export default EditTransaction;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '0 20px',
  },
  switchContainer: {
    justifyContent: 'center',
  },
}));
