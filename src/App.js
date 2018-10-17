import React, { Component } from 'react';
import './App.css';
import Modal from './Modal.js';
import AddingPeopleModal from './AddingPeople.js';
import { deleteRowInTable } from './functions.js'

class App extends Component {

  state = {
    modal: {
      0: false,
      1: false,
    },
    addingPeopleModalClicked: false,
    listOfPeople: [],
  };

  deletePeopleInList = () => {
    return <Modal>

    </Modal>
  };

  showPeople = () => {
    return this.state.listOfPeople.map((person, idx) => <tr data-rowmaintable={idx} key={idx}>

      <td>{person}</td>
      <td>
        <input type='number' className='amountInput'/>
      </td>
      <td onClick={() => deleteRowInTable(idx, 'data-rowmaintable')} className='deleteRow alert-button'>X</td>
    </tr>);
  };

  updateMainPeopleList = (list) => {
    this.setState({listOfPeople: list})
  };

  handleModal = (indexModal) => {
    this.setState((state) => ({ modal[indexModal]: !state.modal[indexModal] }));
  };

  render() {
    const { listOfPeople } = this.state;

    console.log(this.state.modalClicked, 'modalClicked');
    console.log(this.state.addingPeopleModalClicked, 'addingPeopleModalClicked');


    return (
      <div className='mainContainer'>
        <div onClick={() => this.handleModal(this.state.modalClicked)} className={(this.state.modalClicked) ? 'overlay' : 'hide overlay'}></div>
        <AddingPeopleModal
          modalState={this.state.modalClicked}
          listOfPeople={listOfPeople}
          updateMainPeopleList={this.updateMainPeopleList}
          handleModal={this.handleModal}/>
        <h1 className='mainTitle'>LIQUIDACIÓN</h1>
        <div className="addPeopleButtonContainer">
          <div onClick={() => this.handleModal(this.state.addingPeopleModalClicked)} className="addPeopleButton bigButtons">Agregar Personas</div>
          <div onClick={() => this.setState({listOfPeople: []})} className="deleteListButton bigButtons">Borrar Lista Completa</div>
        </div>
        <table className='peopleTable'>
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto</th>
          </tr>
          </thead>
          <tbody>
          {this.showPeople()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

// Hacer el Modal reutilizable
// Avisar en el modal si una persona ya está en la lista

// El ClassName del div del this.state.addPersonsButtonClicked hacerlo sin repetir el overlay en ambos condicionales
// El ClassName de div principal del modal hacerlo sin repetir el global-alert en ambos condicionales
// Cambiar los nombres del State
// Chequear los nombres de las funciones
// Modal with handleClick
