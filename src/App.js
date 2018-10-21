import React, { Component } from 'react';
import './App.css';
import AddingPeopleModal from './Modals/AddingPeople.js';
import DeletingPeopleModal from './Modals/DeletingPeople';

class App extends Component {

  state = {
    modalClickedAddPeople: false,
    modalClickedOverlay: false,
    modalClickedDeletePeople: false,
    addingPeopleModalClicked: false,
    personToDelete: null,
    peopleList: [],
  };

  deletingPerson = (ev, idPerson) => {
    this.setState({personToDelete: idPerson});

    this.handleModal(ev, 'modalClickedDeletePeople');
  };

  deletePersonFromList = (idx) => {
    this.state.peopleList.splice(idx, 1);
  };

  restartPersonToDeleteState = () => {
    this.setState({personToDelete: null});
  };

  closeEveryModal = () => {
    Object.keys(this.state).filter(m => m.includes('modalClicked')).forEach(k => {

      this.setState(() => ({
       [k]: false,
     }));

    });
  };

  showPeople = () => {
    return this.state.peopleList.map((person, idx) => <tr key={idx}>

      <td>{person}</td>
      <td>
        <input type='number' className='amountInput'/>
      </td>
      <td onClick={(ev) => this.deletingPerson(ev, idx)} className='deleteRow alert-button'>X</td>
    </tr>);
  };

  updateMainPeopleList = (list) => {
    this.setState({ peopleList: list })
  };

  handleModal = (ev, title = ev.target.title) => {
    if (title === '') {
      this.closeEveryModal();
    } else {
      this.setState((state) => ({
        modalClickedOverlay: !state.modalClickedOverlay,
        [title]: !state[title]
      }));
    }
  };

  render() {
    const { peopleList,
      personToDelete,
      modalClickedOverlay,
      modalClickedDeletePeople,
      modalClickedAddPeople } = this.state;

    return (
      <div className='mainContainer'>
        <div onClick={(ev) => this.handleModal(ev)} className={(modalClickedOverlay) ? 'overlay' : 'hide overlay'}></div>
        <AddingPeopleModal
          modalState={modalClickedAddPeople}
          peopleList={peopleList}
          updateMainPeopleList={this.updateMainPeopleList}
          handleModal={(ev, title) => this.handleModal(ev, title)}/>
        <DeletingPeopleModal
          modalState={modalClickedDeletePeople}
          personId={personToDelete}
          peopleList={peopleList}
          deletePersonFromList={this.deletePersonFromList}
          restartPersonToDeleteState={this.restartPersonToDeleteState}
          handleModal={(ev, title) => this.handleModal(ev, title)}/>
        <h1 className='mainTitle'>LIQUIDACIÓN</h1>
        <div className="addPeopleButtonContainer">
          <div onClick={(ev) => this.handleModal(ev)} title="modalClickedAddPeople" className="addPeopleButton bigButtons">Agregar Personas</div>
          <div onClick={() => this.setState({peopleList: []})} title="deletePeople" className="deleteListButton bigButtons">Borrar Lista Completa</div>
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
