import React from 'react';

import { InfinitySpin } from 'react-loader-spinner';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Error } from './Error/Error';
import { Modal } from './Modal/Modal';

const API_KEY = '29439492-1518c1b443fd85c1e4954e288';

export class App extends React.Component {
  state = {
    imageList: [],
    status: 'idle',
    totalHits: null,
    page: 1,
    query: '',
    error: null,
    modalIsOpen: false,
    modalImage: '',
  };
  handleFormSubmit = query => {
    this.setState({
      imageList: [],
      page: 1,
      query,
      error: null,
      status: 'idle',
    });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          if (data.total === 0) {
            this.setState({
              status: 'error',
              error: `There is no images for query ${this.state.query}`,
            });
            return;
          }
          this.setState(state => ({
            imageList: [...state.imageList, ...data.hits],
            totalHits: data.totalHits,
            status: 'resolved',
          }));
        });
    }
  }

  getMoreImages = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  onImageClick = event => {
    const lookingImage = this.state.imageList.find(
      image => image.webformatURL === event.currentTarget.src
    ).largeImageURL;

    this.setState({
      modalIsOpen: true,
      modalImage: lookingImage,
    });
  };

  closeModal = () => {
    this.setState(state => ({
      modalIsOpen: false,
    }));
  };

  render() {
    const { imageList, status, totalHits, modalIsOpen, modalImage } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'error' && <Error message={this.state.error} />}

        <ImageGallery list={imageList} onImageClick={this.onImageClick} />

        {imageList.length !== totalHits && imageList.length !== 0 && (
          <Button onClick={this.getMoreImages} />
        )}

        {status === 'pending' && (
          <div className="loader-wrapper">
            <InfinitySpin width="200" color="#3f51b5" />
          </div>
        )}

        {modalIsOpen && (
          <Modal image={modalImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
