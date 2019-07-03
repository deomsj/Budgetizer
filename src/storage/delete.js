import { getSavedUser, getSavedTransactions, save } from './helpers';

const deleteTransaction = (transactionId, userId) => {
  const allTransactions = getSavedTransactions();
  delete allTransactions[transactionId];

  const savedUser = getSavedUser(userId);
  const user = {
    ...savedUser,
    transactions: savedUser.transactions.filter(id => id !== transactionId),
  };

  return save({ user, allTransactions });
};

export default deleteTransaction;
