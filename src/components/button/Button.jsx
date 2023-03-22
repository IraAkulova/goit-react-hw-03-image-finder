import css from '../button/Button.module.css';

export const Button = ({ buttonClick }) => {
  return (
    <button type="button" className={css.button} onClick={buttonClick}>
      Load more
    </button>
  );
};
