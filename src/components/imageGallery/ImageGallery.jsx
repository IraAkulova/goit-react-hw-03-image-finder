import { ImageGalleryItem } from '../imageGalleryItem/imageGalleryItem';
import css from '../imageGallery/ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
      <ul className={css.imageGallery}>
        {images.map(image => (
          <ImageGalleryItem image={image} key={image.id} />
        ))}
      </ul>
    );
};
