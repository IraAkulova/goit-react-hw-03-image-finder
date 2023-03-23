import { ImageGalleryItem } from '../imageGalleryItem/imageGalleryItem';
import css from '../imageGallery/ImageGallery.module.css';

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
