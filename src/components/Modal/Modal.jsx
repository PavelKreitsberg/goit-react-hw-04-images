import React from 'react';

import css from '../Modal/Modal.module.css';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === `Escape`) {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.target.nodeName === 'DIV') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.modal_backdrop} onClick={this.handleBackdropClick}>
        <img
          src={this.props.image}
          className={css.modal_image}
          alt="searching element"
        />
      </div>
    );
  }
}
