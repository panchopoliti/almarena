import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.js'
import '../App.css';
import { deleteErasedPersonsFromList, countingPersonsFromInput, addPeopleToAList } from './../functions.js';

class AddingPeopleModal extends Component {

  state = {
    inputValue: '',
    peopleListInInput: [],
  };

  onInputChange = (event) => {
    const inputValue = event.target.value;
    const peopleListInInput = this.state.peopleListInInput.slice();

    const peopleToAddToList = countingPersonsFromInput(inputValue);

    const listWithAddedPeople = addPeopleToAList(peopleListInInput, inputValue);
    const listWithErasedPeople = deleteErasedPersonsFromList(listWithAddedPeople, peopleToAddToList);

    this.setState({
      peopleListInInput: listWithErasedPeople,
      inputValue,
    });
  };

  cancelBtnFn = (ev) => {
    this.props.handleModal(ev, 'modalClickedAddPeople');
    this.setState({
      inputValue: '',
      peopleListInInput: [],
    });
  };

  addBtnFn = (ev) => {
    this.props.handleModal(ev, 'modalClickedAddPeople');

    const listWithAddedPeople = addPeopleToAList(this.props.peopleList, this.state.inputValue);

    this.setState({
      inputValue: '',
      peopleListInInput: [],
    });
    this.props.updateMainPeopleList(listWithAddedPeople);
  };

  listPeopleInModal = (list) => {
    return list.map((person, idx) => <p key={idx}>{person}</p>)
  };

  render() {

    const { inputValue, peopleListInInput } = this.state;
    const { modalState } = this.props;

    return (
      <Modal modalState={modalState} title='AGREGAR PERSONAS'>
        <div className='inputInModalContainer'>
          <textarea className='inputInModal' onChange={(ev) => this.onInputChange(ev)} placeholder='Separá los nombres con coma' value={inputValue}/>
        </div>
        {this.listPeopleInModal(peopleListInInput)}
        <div className='buttonsInModalContainer'>
          <div onClick={this.cancelBtnFn} className='alert-button buttonsInModal'>Cancelar</div>
          <div onClick={this.addBtnFn} className='succes-button buttonsInModal'>Agregar</div>
        </div>
      </Modal>
    )
  }
}

AddingPeopleModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  updateMainPeopleList: PropTypes.func,
  handleModal: PropTypes.func,
  peopleList: PropTypes.array,
};

export default AddingPeopleModal;
