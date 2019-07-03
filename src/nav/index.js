import React from 'react';
import * as types from 'types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NavDrawer from './Drawer';
import { DRAWER_WIDTH } from './constants';

const NavBar = ({ user }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: !!user && isOpen,
        })}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={openDrawer}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: !user || isOpen,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap className={classes.title}>
            Budgetizer
          </Typography>
          <Typography variant='body1' noWrap className={classes.name}>
            {user && user.firstName}
          </Typography>
        </Toolbar>
      </AppBar>
      {!!user && <NavDrawer isOpen={isOpen} closeDrawer={closeDrawer} />}
    </>
  );
};

export default NavBar;

NavBar.propTypes = {
  user: types.user,
};

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: 36,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));
