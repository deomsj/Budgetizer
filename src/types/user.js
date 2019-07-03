import PropTypes from 'prop-types';

const user = PropTypes.shape({
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.number).isRequired,
});

export default user;
