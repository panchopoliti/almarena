import React, { Component } from 'react';
import './App.css';
import './Print.css';
import AddingPeopleModal from './Modals/AddingPeople.js';
import DeletingPersonModal from './Modals/DeletingPerson';
import DeletingPeopleModal from './Modals/DeletingPeople';

const PeopleForm = ({ peopleList , onClick }) => {
  return peopleList.map((person, idx) => <div key={idx} className='personContainer'>
    <div className='personNameContainer'>
      <span className='personName'>{person}</span>
    </div>
    <div className='inputAndButtonContainer'>
      <input className='inputInPersonContainer' type='number' placeholder='Escribe el monto indicado'/>
      <div onClick={(ev) => onClick(ev, idx)} className='alertButton bigButtons deleteRow'>X</div>
    </div>
  </div>);
};

class App extends Component {

  state = {
    modalClickedAddPeople: false,
    modalClickedOverlay: false,
    modalClickedDeletePerson: false,
    modalClickedDeletePeople: false,
    addingPeopleModalClicked: false,
    personToDelete: null,
    peopleList: [],
  };

  deletingPerson = (ev, idPerson) => {
    this.setState({ personToDelete: idPerson });

    this.handleModal(ev, 'modalClickedDeletePerson');
  };

  deletePersonFromList = (idx) => {
    this.state.peopleList.splice(idx, 1);
  };

  restartPersonToDeleteState = () => {
    this.setState({ personToDelete: null });
  };

  closeEveryModal = () => {
    Object.keys(this.state).filter(m => m.includes('modalClicked')).forEach(k => {

      this.setState(() => ({
       [k]: false,
     }));

    });
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
      modalClickedDeletePerson,
      modalClickedDeletePeople,
      modalClickedAddPeople } = this.state;

    return (
      <div className='mainContainer'>
        <div className='defaultView'>
          <div onClick={(ev) => this.handleModal(ev)} className={(modalClickedOverlay) ? 'overlay' : 'hide overlay'}></div>
          <AddingPeopleModal
            modalState={modalClickedAddPeople}
            peopleList={peopleList}
            updateMainPeopleList={this.updateMainPeopleList}
            handleModal={(ev, title) => this.handleModal(ev, title)}/>
          <DeletingPersonModal
            modalState={modalClickedDeletePerson}
            personId={personToDelete}
            peopleList={peopleList}
            deletePersonFromList={this.deletePersonFromList}
            restartPersonToDeleteState={this.restartPersonToDeleteState}
            handleModal={(ev, title) => this.handleModal(ev, title)}/>
          <DeletingPeopleModal
            modalState={modalClickedDeletePeople}
            deletePeopleFromList={() => this.setState({peopleList: []})}
            handleModal={(ev, title) => this.handleModal(ev, title)}/>
          <h1 className='mainTitle'>LIQUIDACIÓN</h1>
          <div className="addPeopleButtonContainer">
            <div onClick={(ev) => this.handleModal(ev)} title="modalClickedAddPeople" className="addPeopleButton bigButtons">Agregar Personas</div>
            <div onClick={(ev) => this.handleModal(ev)} title="modalClickedDeletePeople" className="deleteListButton bigButtons">Borrar Lista Completa</div>
          </div>
          <form>
            <PeopleForm peopleList={peopleList} onClick={(ev, idPerson) => this.deletingPerson(ev, idPerson)}/>
          </form>
          <div className='printerButtonContainer'>
            <div className={'successButton bigButtons'}>Imprimir</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// Avisar en el modal si una persona ya está en la lista
// Con Esc cerrar el modal

// El ClassName del div del this.state.addPersonsButtonClicked hacerlo sin repetir el overlay en ambos condicionales
// El ClassName de div principal del modal hacerlo sin repetir el globalAlert en ambos condicionales
// Cambiar los nombres del State
// Chequear los nombres de las funciones
// Modal with handleClick
