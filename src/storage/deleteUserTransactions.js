import { getSavedUser, getSavedTransactions, save } from './helpers';

const deleteUserTransactions = userId => {
  const savedUser = getSavedUser(userId);
  const allTransactions = getSavedTransactions();
  savedUser.transactions.forEach(transactionId => {
    delete allTransactions[transactionId];
  });

  const user = {
    ...savedUser,
    transactions: [],
  };

  return save({ user, allTransactions });
};

export default deleteUserTransactions;
