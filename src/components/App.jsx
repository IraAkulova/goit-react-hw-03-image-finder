import React, { Component } from 'react';
import { Button } from './button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import { Searchbar } from './searchbar/Searchbar';

const controller = new AbortController();
const signal = controller.signal;

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
    loading: false,
    error: null,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page < this.state.page) {
      this.setState({ loading: true, images: [] });
      this.fetchImgs(this.state.query, signal)
        .then(imgs => { 
          if (imgs.hits.length === 0) {
            return Promise.reject(
              new Error(`Oops, there is no images with tag ${this.state.query}`)
            );
          }
          this.setState({ images: [...prevState.images, ...imgs.hits] })
        })
        .catch(error => this.setState({error}))
        .finally(() => {
          this.setState({ loading: false });
          console.log(this.state.error)
        });
    }
  };

  componentWillUnmount = () => {
    controller.abort();
  };

  toggleModal = (image, name) => {
    this.setState(state => ({
      showModal: !state.showModal,
      url: image,
      description: name,
    }));
  };

  formSubmitHandler = ({ query }) => {
    this.setState({ query });
          this.setState({ loading: true, images: [] });

    this.fetchImgs(query)
      .then(imgs => {
        if (imgs.hits.length === 0) {
          return Promise.reject(
            new Error(`Oops, there is no images wiht tag ${this.state.query}`)
          );
        }
        this.setState({ images: imgs.hits })
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
        console.log(this.state.error);
      });
  };

  fetchImgs = query => {
    return fetch(
      `${this.BASE_URL}?q=${query}&page=1&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
    ).then(response => {
      return response.json();
    });
  };

  // onError = error => {
  //   alert(`Oops, there is no images wiht such tag`);
  // };

  buttonClickHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { showModal, images, url, description, loading, error } = this.state;
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
        {error && images.length === 0 && <h2>{error.message}</h2>}
        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {loading && <Loader />}
        {images.length > 0 && <Button buttonClick={this.buttonClickHandler} />}
      </div>
    );
  }
};
