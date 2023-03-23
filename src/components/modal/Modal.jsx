import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = {
    image: '',
    name: '',
  };

  componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
      this.setState({ image: this.props.image, name: this.props.name });
    };

  componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
      this.setState({ image: '', name: '' });
    };
    
    handleKeyDown = e => {
        console.log(e.code);
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
    };
    
    handleOverlayClick = e => {
        if (e.target !== e.currentTarget) {return;};
        this.props.toggleModal();
    };

  render() {
    const { image, name } = this.state;
      return createPortal(
        <div className={css.overlay} onClick={this.handleOverlayClick}>
          <div className={css.modal}>
            <img src={image} alt={name} />
          </div>
        </div>,
        modalRoot
      );
  }
}
