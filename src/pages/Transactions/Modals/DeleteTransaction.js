import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const DeleteTransaction = ({ transaction, actions }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const handleDelete = () => {
    actions.deleteTransaction(transaction.id);
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip
        title='Delete Transaction'
        aria-label='Delete Transaction'
        enterDelay={500}
        onClick={openDialog}
        className={classes.trigger}>
        <Fab color='secondary' size='small'>
          <DeleteIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        onClose={closeDialog}>
        <DialogTitle>Delete transaction</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant='body1' component='div' align='left'>
            <p>
              <b>Description:</b> {transaction.description}
            </p>
            <p>
              <b>Merchant:</b> {transaction.merchant}
            </p>
            <p>
              <b>Debit / Credit:</b> {transaction.debit ? 'Debit' : 'Credit'}
            </p>
            <p>
              <b>Amount:</b> {transaction.amount}
            </p>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTransaction;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '0 20px',
  },
  trigger: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));
