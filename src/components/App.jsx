import { useState, useEffect } from 'react';

import { InfinitySpin } from 'react-loader-spinner';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Error } from './Error/Error';
import Modal from './Modal/Modal';

const API_KEY = '29439492-1518c1b443fd85c1e4954e288';

export default function App() {
  const [imageList, setImageList] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleFormSubmit = query => {
    setImageList([]);
    setPage(1);
    setQuery(query);
    setError(null);
    setStatus('idle');
  };

  const getMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const onImageClick = event => {
    const lookingImage = imageList.find(
      image => image.webformatURL === event.currentTarget.src
    ).largeImageURL;
    setModalIsOpen(true);
    setModalImage(lookingImage);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');

    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        if (data.total === 0) {
          setStatus('error');
          setError(`There is no images for query ${query}`);
          return;
        }
        setImageList(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus('resolved');
      });
  }, [query, page]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'error' && <Error message={error} />}

      <ImageGallery list={imageList} onImageClick={onImageClick} />

      {imageList.length !== totalHits && imageList.length !== 0 && (
        <Button onClick={getMoreImages} />
      )}

      {status === 'pending' && (
        <div className="loader-wrapper">
          <InfinitySpin width="200" color="#3f51b5" />
        </div>
      )}

      {modalIsOpen && <Modal image={modalImage} closeModal={closeModal} />}
    </div>
  );
}
