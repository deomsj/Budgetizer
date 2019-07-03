import React from 'react';
import * as types from 'types';
import { Route, Redirect, Switch } from 'react-router-dom';
import Transactions from './Transactions';
import Analysis from './Analysis.js';
import Upload from './Upload';
import Download from './Download';
import Account from './Account';
import Login from './Login.js';

const Main = props => {
  const Private = ({ path, component: Component }) => {
    if (!props.user) {
      return <Redirect to='/' />;
    }
    return <Route path={path} render={() => <Component {...props} />} />;
  };
  return (
    <Switch>
      <Private path='/transactions' component={Transactions} />
      <Private path='/analysis' component={Analysis} />
      <Private path='/upload' component={Upload} />
      <Private path='/download' component={Download} />
      <Private path='/account' component={Account} />
      <Route path='/' render={() => <Login {...props} />} />
      <Redirect to='/' />
    </Switch>
  );
};

export default Main;

Main.propTypes = {
  actions: types.actions.isRequired,
  user: types.user,
  transactions: types.transactions.isRequired,
};
