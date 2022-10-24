import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';

import PropTypes from 'prop-types';

export const ImageGallery = ({ list, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {list.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  onImageClick: PropTypes.func.isRequired,
};
