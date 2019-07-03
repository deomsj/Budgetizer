import React from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const Transition = direction =>
  React.forwardRef(function Transition(props, ref) {
    return <Slide direction={direction} ref={ref} {...props} />;
  });

export const TransitionDown = Transition('down');
export const TransitionUp = Transition('up');

export const useStyles = makeStyles(theme => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '0 20px',
  },
  switchContainer: {
    justifyContent: 'center',
  },
  trigger: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));
