import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.js'
import '../App.css';

class DeletingPerson extends Component {

  cancelBtnFn = (ev) => {
    this.props.handleModal(ev, 'modalClickedDeletePerson');
    this.props.restartPersonToDeleteState();
  };

  deleteBtnFn = (ev) => {
    const { deletePersonFromList, handleModal, restartPersonToDeleteState, personId } = this.props;

    handleModal(ev, 'modalClickedDeletePerson');
    deletePersonFromList(personId);
    restartPersonToDeleteState();
  };

  render() {

    const { modalState, peopleList, personId } = this.props;

    return (
      <Modal modalState={modalState}
             closeModal={this.cancelBtnFn}
             closeSuccessModal={this.deleteBtnFn}
             title={`¿Estás seguro que deseas eliminar a ${peopleList[personId]}?`}>
        <div className='buttonsInModalContainer'>
          <div onClick={this.cancelBtnFn} className='alertButton buttonsInModal'>Cancelar</div>
          <div onClick={this.deleteBtnFn} className='successButton buttonsInModal'>Eliminar</div>
        </div>
      </Modal>
    )
  }
}

DeletingPerson.propTypes = {
  modalState: PropTypes.bool.isRequired,
  peopleList: PropTypes.array,
  personId: PropTypes.number,
  restartPersonToDeleteState: PropTypes.func,
  deletePersonFromList: PropTypes.func,
  handleModal: PropTypes.func,
};

export default DeletingPerson;
