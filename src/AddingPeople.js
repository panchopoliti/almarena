import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.js'
import './App.css';
import {deleteErasedPersonsFromList, countingPersonsFromInput, addPeopleToAList} from './functions.js';

class AddingPeopleModal extends Component {

  state = {
    inputValue: '',
    listOfPeopleInInput: [],
  };

  onInputChange = (event) => {
    const inputValue = event.target.value;
    const listOfPeopleInInput = this.state.listOfPeopleInInput.slice();

    const peopleToAddToList = countingPersonsFromInput(inputValue);

    const listWithAddedPeople = addPeopleToAList(listOfPeopleInInput, inputValue);
    const listWithErasedPeople = deleteErasedPersonsFromList(listWithAddedPeople, peopleToAddToList);

    this.setState({
      listOfPeopleInInput: listWithErasedPeople,
      inputValue,
    });
  };

  cancelBtnFn = () => {
    this.props.handleModal();
    this.setState({
      inputValue: '',
      listOfPeopleInInput: [],
    });
  };

  addBtnFn = () => {
    this.props.handleModal();

    const listWithAddedPeople = addPeopleToAList(this.props.listOfPeople, this.state.inputValue);

    this.setState({
      inputValue: '',
      listOfPeopleInInput: [],
    });
    this.props.updateMainPeopleList(listWithAddedPeople);
  };

  listPeopleInModal = (list) => {
    return list.map((person, idx) => <p key={idx}>{person}</p>)
  };

  render() {

    const { inputValue, listOfPeopleInInput } = this.state;
    const { modalState } = this.props;

    return (
      <Modal modalState={modalState} title='AGREGAR PERSONAS'>
        <div className='inputInModalContainer'>
          <textarea className='inputInModal' onChange={(ev) => this.onInputChange(ev)} placeholder='Separá los nombres con coma' value={inputValue}/>
        </div>
        {this.listPeopleInModal(listOfPeopleInInput)}
        <div className='buttonsInModalContainer'>
          <div onClick={this.cancelBtnFn} className='alert-button buttonsInModal'>Cancelar</div>
          <div onClick={this.addBtnFn} className='succes-button buttonsInModal'>Agregar</div>
        </div>
      </Modal>
    )
  }
}

Modal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  updateMainPeopleList: PropTypes.func,
  handleModal: PropTypes.func,
  listOfPeople: PropTypes.array,
};

export default AddingPeopleModal;
