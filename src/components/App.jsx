import React, { Component } from 'react';
import { Button } from './button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Searchbar } from './searchbar/Searchbar';

export class App extends Component {
  KEY = '33290430-0314363842258507589316bae';
  BASE_URL = 'https://pixabay.com/api/';

  state = {
    images: [],
    page: 1,
    query: '',
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
    alert(`Oops, there is no images wiht such tag`);
  };

  buttonClickHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page < this.state.page) {
      this.fetchImgs(this.state.query)
        .then(imgs =>
          this.setState({ images: [...prevState.images, ...imgs.hits] })
        )
        .catch(this.onError);
    };
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {this.state.images.length === 0 && (
          <Loader />
        )}
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        {this.state.images.length > 0 && (
          <Button buttonClick={this.buttonClickHandler} />
        )}
      </div>
    );
  }
}
