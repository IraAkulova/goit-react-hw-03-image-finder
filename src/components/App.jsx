import React, { Component } from 'react';
import { Button } from './button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import { Searchbar } from './searchbar/Searchbar';

export class App extends Component {
  KEY = '33290430-0314363842258507589316bae';
  BASE_URL = 'https://pixabay.com/api/';

  state = {
    images: [],
    page: 1,
    query: '',
    showModal: false,
    url: '',
    description: '',
    status: 'idle',
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page < this.state.page) {
      this.setState({ status: 'pending' });
      setTimeout(() => {
        this.fetchImgs(this.state.query)
          .then(imgs =>
            this.setState({ images: [...prevState.images, ...imgs.hits] })
          )
          .catch(this.onError);
      }, 2000);
      
      
    }
  };

  toggleModal = (image, name) => {
  this.setState(state => ({ showModal: !state.showModal, url: image, description: name}));
  };

  formSubmitHandler = ({ query }) => {
    this.setState({ query });
    this.fetchImgs(query)
      .then(imgs => this.setState({ images: imgs.hits }))
      .catch(this.onError);
  };

  fetchImgs = query => {
    return fetch(
      `${this.BASE_URL}?q=${query}&page=1&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
    ).then(response => {
      return response.json();
    });
  };

  onError = error => {
    alert(`Oops, there is no images wiht such tag`, error.message);
  };

  buttonClickHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { showModal, images, url, description, status } = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.formSubmitHandler} />;
    };
    if (status === 'pending') {
      return <Loader />;
    };
    if (status === 'resolved') {
      return <ImageGallery images={images} toggleModal={this.toggleModal} />;
    }
    // if (status === 'rejectet') {
    //   return <div><p></p></div>
    // }
    return (
      <div>
        {showModal && (
          <Modal
            image={url}
            name={description}
            toggleModal={this.toggleModal}
          />
        )}
        <Searchbar onSubmit={this.formSubmitHandler} />
        {images.length === 0 && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {images.length > 0 && <Button buttonClick={this.buttonClickHandler} />}
      </div>
    );
  }
}
