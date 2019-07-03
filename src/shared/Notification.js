import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  msg: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Notification = ({ message, closeNotification }) => {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={!!message}
      onClose={closeNotification}
      autoHideDuration={4000}>
      <SnackbarContent
        className={classes.msg}
        message={
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            {message}
          </span>
        }
      />
    </Snackbar>
  );
};

export default Notification;
