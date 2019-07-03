import { getSavedUser, getSavedTransactions, saveUser } from './helpers';

const login = userId => {
  let user;
  const allTransactions = getSavedTransactions();
  const userString = localStorage.getItem(`user-${userId}`);

  if (!userString) {
    const [firstName, lastName, dob] = userId.split('-/-');
    user = {
      id: userId,
      dob,
      firstName,
      lastName,
      transactions: [],
    };
    saveUser(user);
  } else {
    user = getSavedUser(userId);
  }

  return { user, allTransactions };
};

export default login;
