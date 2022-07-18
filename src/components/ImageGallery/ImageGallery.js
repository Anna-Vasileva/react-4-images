import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import { nanoid } from "nanoid";

function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      {gallery.map(({ webformatURL, tags, id, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={nanoid()}
            webformatURL={webformatURL}
            tag={tags}
            onClick={onClick}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
export default ImageGallery;
