import { getSavedTransactions, save } from './helpers';

const editTransaction = transaction => {
  const savedTransactions = getSavedTransactions();
  const allTransactions = {
    ...savedTransactions,
    [transaction.id]: transaction,
  };

  return save({ allTransactions });
};

export default editTransaction;
