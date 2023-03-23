import css from '../imageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, name, toggleModal }) => {
  return (
    <li className={css.imageGalleryItem}>
      <a href="#" onClick={() => toggleModal(image, name)}>
        <img
          src={image}
          alt={name}
          className={css.imageGalleryItemImage}
        />
      </a>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  toggleModal: PropTypes.func,
};
