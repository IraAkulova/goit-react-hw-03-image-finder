import css from '../button/Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ buttonClick }) => {
  return (
    <button type="button" className={css.button} onClick={buttonClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  buttonClick: PropTypes.func,
};