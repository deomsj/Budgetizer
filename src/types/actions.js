import PropTypes from 'prop-types';

const actions = PropTypes.shape({
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  editTransaction: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  uploadTransactions: PropTypes.func.isRequired,
  deleteUserTransactions: PropTypes.func.isRequired,
});

export default actions;
