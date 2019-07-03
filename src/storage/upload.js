import { getSavedUser, getSavedTransactions, save } from './helpers';

const uploadTransactions = (transactions, userId) => {
  const allTransactions = getSavedTransactions();
  const user = getSavedUser(userId);

  transactions.forEach(transaction => {
    // ensure that id is unique
    while (allTransactions[transaction.id]) {
      transaction.id++;
    }
    allTransactions[transaction.id] = transaction;
    user.transactions.push(transaction.id);
  });

  return save({ user, allTransactions });
};

export default uploadTransactions;
