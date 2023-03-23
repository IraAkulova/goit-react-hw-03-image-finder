import css from '../imageGalleryItem/ImageGalleryItem.module.css';

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
