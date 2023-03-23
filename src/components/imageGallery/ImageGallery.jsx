import { ImageGalleryItem } from '../imageGalleryItem/imageGalleryItem';
import css from '../imageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ webformatURL, tags, id }) => (
        <ImageGalleryItem
          image={webformatURL}
          name={tags}
          key={id}
          toggleModal={toggleModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  toggleModal: PropTypes.func,
};
