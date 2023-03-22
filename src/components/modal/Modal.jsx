import React, { Component } from 'react';
import css from '../modal/Modal.module.css';

export class Modal extends Component {
  state = {
    image: '',
    name: '',
  };

  componentDidMount() {
      window.addEventListener('keydown', this.keyClose);
      this.setState({ image: this.props.image, name: this.props.name });
    };

  componentWillUnmount() {
    window.addEventListener('keydown', this.keyClose);
    };

  keyClose = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  render() {
    const { image, name } = this.state;
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={image} alt={name} />
        </div>
      </div>
    );
  }
}
