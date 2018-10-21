import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.js'
import '../App.css';

class DeletingPeople extends Component {

  cancelBtnFn = (ev) => {
    this.props.handleModal(ev, 'modalClickedDeletePeople');
    this.props.restartPersonToDeleteState();
  };

  deleteBtnFn = (ev) => {
    const { deletePersonFromList, handleModal, restartPersonToDeleteState } = this.props;

    handleModal(ev, 'modalClickedDeletePeople');
    deletePersonFromList();
    restartPersonToDeleteState();
  };

  render() {

    const { modalState, peopleList, personId } = this.props;

    return (
      <Modal modalState={modalState} title={`¿Estás seguro que deseas eliminar a ${peopleList[personId]}?`}>
        <div className='buttonsInModalContainer'>
          <div onClick={this.cancelBtnFn} className='alert-button buttonsInModal'>Cancelar</div>
          <div onClick={this.deleteBtnFn} className='succes-button buttonsInModal'>Eliminar</div>
        </div>
      </Modal>
    )
  }
}

DeletingPeople.propTypes = {
  modalState: PropTypes.bool.isRequired,
  peopleList: PropTypes.array,
  personId: PropTypes.number,
  restartPersonToDeleteState: PropTypes.func,
  deletePersonFromList: PropTypes.func,
  handleModal: PropTypes.func,
};

export default DeletingPeople;
