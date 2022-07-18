import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ webformatURL, tags, largeImageURL, onClick }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s["ImageGalleryItem-image"]}
        onClick={onClick}
        data-url={largeImageURL}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
