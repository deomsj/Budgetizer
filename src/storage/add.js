import { getSavedUser, getSavedTransactions, save } from './helpers';

const addTransaction = transaction => {
  //add transaction to collection of allTransactions
  const savedTransactions = getSavedTransactions();
  // ensure that id is unique
  while (savedTransactions[transaction.id]) {
    transaction.id++;
  }
  const allTransactions = {
    ...savedTransactions,
    [transaction.id]: transaction,
  };

  //add transaction id to user's array of transaction ids
  const saveUser = getSavedUser(transaction.user_id);
  const user = {
    ...saveUser,
    transactions: [...saveUser.transactions, transaction.id],
  };

  return save({ user, allTransactions });
};

export default addTransaction;
