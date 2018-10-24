import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Modal extends Component {

  closeModalOnKeyPress = (ev, title) => {
    const noop = () => {};

    switch (ev.which) {
      case 27: //ESC
        return this.props.closeModal(ev, title);
      case 13: //ENTER
        return this.props.closeSuccessModal(ev, title);
      default:
        noop();
    }

  };

  render() {

    const { modalState, children, title } = this.props;

    return (
      <div id='mainContainer'
           tabIndex={0} //For focusing
           className={(modalState) ? 'globalAlert' : 'hide globalAlert'}
           onKeyDown={(ev) => this.closeModalOnKeyPress(ev)}>
        <div className='modalContainer'>
          <div className='modalTextContainer'>
            <span className='modalText'>{title}</span>
          </div>
          {children}
        </div>
      </div>
      );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  modalState: PropTypes.bool.isRequired,
  closeSuccessModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default Modal;
