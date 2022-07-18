import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import mapper from "./helpers/mapper";

const KEY = "23417274-c745cca46d265f1806e9566e8";
function App() {
  const [gallery, setGallery] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      setGallery(null);
      setPage(1);
      return;
    }
    setLoader(true);
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    fetch(URL)
      .then((res) => res.json())
      .then((newGallery) => {
        setGallery((prevGallery) => {
          if (!newGallery.hits.length) return null;

          return !prevGallery
            ? mapper(newGallery.hits)
            : [...prevGallery, ...mapper(newGallery.hits)];
        });
      })

      .catch((err) => {
        setGallery(null);
        setPage(1);
        alert("Error!");
      })
      .finally(() => {
        setLoader(false);

        if (page > 1) {
          scroll();
        }
      });
  }, [query, page]);

  const onSubmit = (namePicture) => {
    setGallery(null);
    setPage(1);
    setQuery(namePicture);
  };
  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const toggleModal = (e) => {
    setShowModal((prevShowModal) => !prevShowModal);

    largeImageURL === ""
      ? setLargeImageURL(e.currentTarget.getAttribute("data-url"))
      : setLargeImageURL("");
  };
  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmit} />
      {gallery && (
        <>
          <ImageGallery gallery={gallery} onClick={toggleModal} />
          {loader && <Loader />}
          <Button onClick={onLoadMore} />
        </>
      )}
    </div>
  );
}

export default App;
