import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Modal extends Component {

  render() {

    const { modalState, children, title } = this.props;

    return (
      <div className={(modalState) ? 'global-alert' : 'hide global-alert'}>
        <div className='modalContainer'>
          <div className='modalTextContainer'>
            <span className='modalText'>{title}</span>
          </div>
          {children}
        </div>
      </div>
      )
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  modalState: PropTypes.bool.isRequired,
};

export default Modal;
