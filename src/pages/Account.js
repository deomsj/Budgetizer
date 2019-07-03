import React from 'react';
import * as types from 'types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

const Account = ({ user, actions }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    setOpen(false);
    actions.deleteUserTransactions();
  };

  return (
    <main>
      <Paper className={classes.paper}>
        <Typography>
          <b>First Name:</b> {user.firstName}
        </Typography>
        <Typography>
          <b>Last Name:</b> {user.lastName}
        </Typography>
        <Typography>
          <b>Date of Birth:</b> {user.dob}
        </Typography>
        <Typography>
          <b>Transactions:</b> {user.transactions.length}
        </Typography>
        <br />
        <Button variant='outlined' color='primary' onClick={handleClickOpen}>
          Delete All Transactions
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            Delete All Transactions
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='dialog-description'>
              Click the DELETE button below to permanently delete all of your
              transaction data. If you would like to download, your data as a
              CSV file, before removing it from this app, you can do so here:{' '}
              <Link to='/download'>Download Data</Link>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='secondary' autoFocus>
              Cancel
            </Button>
            <Button onClick={handleDelete} color='primary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </main>
  );
};

export default Account;

Account.propTypes = {
  actions: types.actions.isRequired,
  user: types.user.isRequired,
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
  },
}));
