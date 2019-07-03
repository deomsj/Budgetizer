import defaultUser from './constants';
// Getters

export const getSavedUser = userId => {
  const userString = localStorage.getItem(`user-${userId}`);
  return JSON.parse(userString) || defaultUser;
};

export const getSavedTransactions = () => {
  const allTransactionsString = localStorage.getItem('allTransactions');
  return allTransactionsString ? JSON.parse(allTransactionsString) : {};
};

// Setters

export const save = ({ user, allTransactions }) => {
  if (user) saveUser(user);
  if (allTransactions) saveAllTransactions(allTransactions);
  return { user, allTransactions };
};

export const saveUser = user => {
  const stringifiedUser = JSON.stringify(user);
  localStorage.setItem(`user-${user.id}`, stringifiedUser);
  return user;
};

export const saveAllTransactions = allTransactions => {
  const stringifiedTransactions = JSON.stringify(allTransactions);
  localStorage.setItem('allTransactions', stringifiedTransactions);
  return allTransactions;
};
