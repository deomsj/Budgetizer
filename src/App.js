import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Navbar from './nav/index';
import Main from './pages';
import Notification from './shared/Notification';
import * as storage from './storage';

const App = ({ history }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState({});
  const [notification, setNotification] = useState();

  const closeNotification = () => setNotification(null);

  const actions = {
    login: userId => {
      const stored = storage.login(userId);
      setUser(stored.user);
      setTransactions(stored.allTransactions);
      history.push('/transactions');
    },
    logout: () => setUser(null),
    addTransaction: transaction => {
      const stored = storage.addTransaction(transaction);
      setUser(stored.user);
      setTransactions(stored.allTransactions);
      setNotification(`New transaction saved!`);
    },
    editTransaction: transaction => {
      const stored = storage.editTransaction(transaction);
      setTransactions(stored.allTransactions);
      setNotification(`Transaction edits saved!`);
    },
    deleteTransaction: transactionId => {
      const stored = storage.deleteTransaction(transactionId, user.id);
      setUser(stored.user);
      setTransactions(stored.allTransactions);
      setNotification(`Transaction successfully deleted!`);
    },
    uploadTransactions: transactions => {
      const stored = storage.uploadTransactions(transactions, user.id);
      setUser(stored.user);
      setTransactions(stored.allTransactions);
      history.push('/transactions');
      setNotification(`Transactions uploaded and saved!`);
    },
    deleteUserTransactions: () => {
      const stored = storage.deleteUserTransactions(user.id);
      setUser(stored.user);
      setTransactions(stored.allTransactions);
      setNotification(`All of your transactions have been deleted!`);
    },
  };

  return (
    <div className='App'>
      <Navbar user={user} />
      <Main user={user} transactions={transactions} actions={actions} />
      <Notification
        message={notification}
        closeNotification={closeNotification}
      />
    </div>
  );
};

export default withRouter(App);

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
