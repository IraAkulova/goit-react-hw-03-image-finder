import css from '../imageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.name}
        className={css.imageGalleryItemImage}
      />
    </li>
  );
};
