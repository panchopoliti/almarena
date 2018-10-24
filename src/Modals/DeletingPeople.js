import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.js'
import '../App.css';

class DeletingPeople extends Component {

  cancelBtnFn = (ev) => {
    this.props.handleModal(ev, 'modalClickedDeletePeople');
  };

  deleteBtnFn = (ev) => {
    const { deletePeopleFromList, handleModal } = this.props;

    handleModal(ev, 'modalClickedDeletePeople');
    deletePeopleFromList();
  };

  render() {

    const { modalState } = this.props;

    return (
      <Modal modalState={modalState}
             closeModal={this.cancelBtnFn}
             closeSuccessModal={this.deleteBtnFn}
             title={'¿Estás seguro que deseas eliminar la lista?'}>
        <div className='buttonsInModalContainer'>
          <div onClick={this.cancelBtnFn} className='alertButton buttonsInModal'>Cancelar</div>
          <div onClick={this.deleteBtnFn} className='successButton buttonsInModal'>Eliminar</div>
        </div>
      </Modal>
    )
  }
}

DeletingPeople.propTypes = {
  modalState: PropTypes.bool.isRequired,
  deletePeopleFromList: PropTypes.func,
  handleModal: PropTypes.func,
};

export default DeletingPeople;
