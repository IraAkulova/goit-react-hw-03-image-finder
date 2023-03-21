import React, { Component } from 'react';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Searchbar } from './searchbar/Searchbar';

export class App extends Component {
  KEY = '33290430-0314363842258507589316bae';
  BASE_URL = 'https://pixabay.com/api/';

  state = {
    images: [],
  };

  formSubmitHandler = (data) => {
    this.fetchImgs(data).then(imgs => this.setState({images: imgs.hits})).catch(this.onError);
  }

  fetchImgs = (data) => {
    return fetch(
      `${this.BASE_URL}?q=${data.query}&page=1&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => {
      return response.json();
    });
  };

  onError = (error) => {
    alert(`Oops, there is no images wiht such tag`)
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {this.state.images.length > 0 && <ImageGallery images={this.state.images} />}
      </div>
    );
  }
}
