import css from '../Error/Error.module.css';

import PropTypes from 'prop-types';

export const Error = ({ message }) => {
  return <p className={css.error}>{message}</p>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
