import React from 'react';
import * as types from 'types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddTransaction from './Modals/AddTransaction';
import { UnderlinedInput } from 'shared/TextInput';

const TableToolbar = ({ actions, user, filter, setFilter, noData }) => {
  const classes = useToolbarStyles();

  return (
    <>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant='h6' id='tableTitle'>
            Transactions
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <AddTransaction actions={actions} user={user} />
        </div>
      </Toolbar>
      {noData ? null : (
        <UnderlinedInput
          value={filter}
          onChange={setFilter}
          placeholder='Search...'
          className={classes.input}
        />
      )}
    </>
  );
};

TableToolbar.propTypes = {
  actions: types.actions.isRequired,
  user: types.user.isRequired,
  filter: types.PropTypes.string.isRequired,
  setFilter: types.PropTypes.func.isRequired,
  noData: types.PropTypes.bool.isRequired,
};

export default TableToolbar;

const useToolbarStyles = makeStyles(theme => ({
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    paddingLeft: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  input: {
    width: '90%',
    margin: '8px 5% 16px',
  },
  title: {
    flex: '0 0 auto',
  },
}));
