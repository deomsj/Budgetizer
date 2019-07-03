import PropTypes from 'prop-types';

const transaction = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user_id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  merchant: PropTypes.string.isRequired,
  debit: PropTypes.bool.isRequired,
  amount: PropTypes.string.isRequired,
});

export default transaction;
