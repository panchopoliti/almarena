import React, { Component } from 'react';
import './App.css';
import './Print.css';
import { getDayMonthAndYear, addMountToIncomeList } from './functions.js';
import AddingPeopleModal from './Modals/AddingPeople.js';
import DeletingPersonModal from './Modals/DeletingPerson';
import DeletingPeopleModal from './Modals/DeletingPeople';

const PeopleForm = ({ peopleList , onClick, onInputChange }) => {

  const onChange = (ev, personIdx) => {
    const list = addMountToIncomeList(peopleList, ev.target.value, personIdx);

    return onInputChange('peopleList', list);
  };

  return peopleList.map((personObj, idx) => <div key={idx} className='personContainer'>
    <div className='personNameContainer'>
      <span className='personName'>{personObj.name}</span>
    </div>
    <div className='inputAndButtonContainer onlyScreenView'>
      <input className='inputForNumber' type='number' onChange={(ev) => onChange(ev, idx)} placeholder='Escribe el monto indicado'/>
      <div onClick={(ev) => onClick(ev, idx)} className='alertButton bigButtons deleteRow'>X</div>
    </div>
  </div>);
};

const PeopleTextToPrint = ({ peopleList, value, date }) => {

  return peopleList.map((person, idx) => {

    const changingWords = {
      EMPLOYEE: person.name,
      MOUNT: person.mount,
      DAY: date.day,
      MONTH: date.month,
      YEAR: date.year,
    };

    let textToPrint = value;

    Object.keys(changingWords).forEach((word) => {
      textToPrint = textToPrint.replace(word, changingWords[word]);
      console.log(textToPrint);
    });

    return (
      <div className='onlyPrint' key={idx}>
      <span>{textToPrint}</span>
    </div>
    );
  });
};

class App extends Component {

  state = {
    modalClickedAddPeople: false,
    modalClickedOverlay: false,
    modalClickedDeletePerson: false,
    modalClickedDeletePeople: false,
    addingPeopleModalClicked: false,
    dayToPrint: 0,
    monthToPrint: 'Enero',
    yearToPrint: 0,
    personToDelete: null,
    peopleList: [],
    textToPrint: 'El empleado EMPLOYEE ha recibido el monto de MOUNT el día DAY de MONTH de YEAR',
  };

  componentDidMount() {

    const { day, month, year } = getDayMonthAndYear();

    this.setState({
      dayToPrint: day,
      monthToPrint: month,
      yearToPrint: year,
    });
  }

  deletingPerson = (ev, idPerson) => {
    this.setState({ personToDelete: idPerson });

    this.handleModal(ev, 'modalClickedDeletePerson');
  };

  closeEveryModal = () => {
    Object.keys(this.state).filter(m => m.includes('modalClicked')).forEach(k => {

      this.setState(() => ({
       [k]: false,
     }));

    });
  };

  updateState = (target, value) => {
    this.setState({ [target]: value })
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
      textToPrint,
      dayToPrint,
      monthToPrint,
      yearToPrint,
      personToDelete,
      modalClickedOverlay,
      modalClickedDeletePerson,
      modalClickedDeletePeople,
      modalClickedAddPeople } = this.state;

    return (
      <div className='mainContainer'>
        <div onClick={(ev) => this.handleModal(ev)} className={(modalClickedOverlay) ? 'overlay' : 'hide overlay'}></div>
        <AddingPeopleModal
          modalState={modalClickedAddPeople}
          peopleList={peopleList}
          updateMainPeopleList={this.updateState}
          handleModal={(ev, title) => this.handleModal(ev, title)}/>
        <DeletingPersonModal
          modalState={modalClickedDeletePerson}
          personId={personToDelete}
          peopleList={peopleList}
          deletePersonFromList={(idx) => this.state.peopleList.splice(idx, 1)}
          restartPersonToDeleteState={() => this.setState({ personToDelete: null })}
          handleModal={(ev, title) => this.handleModal(ev, title)}/>
        <DeletingPeopleModal
          modalState={modalClickedDeletePeople}
          deletePeopleFromList={() => this.setState({peopleList: []})}
          handleModal={(ev, title) => this.handleModal(ev, title)}/>
        <h1 className='mainTitle onlyScreenView'>LIQUIDACIÓN</h1>
        <div className="addPeopleButtonContainer onlyScreenView">
          <div onClick={(ev) => this.handleModal(ev)} title="modalClickedAddPeople" className="addPeopleButton bigButtons">Agregar Personas</div>
          <div onClick={(ev) => this.handleModal(ev)} title="modalClickedDeletePeople" className="deleteListButton bigButtons">Borrar Lista Completa</div>
        </div>
        <div className='monthAndYearContainer'>
          <div className='inputContainerMonthAndYear'>
            <span className='spanTitle'>Día</span>
            <input className='inputForNumber' onChange={(ev) => this.updateState('dayToPrint', ev.target.value)} type='number' value={dayToPrint}/>
          </div>
          <div className='inputContainerMonthAndYear'>
            <span className='spanTitle'>Mes</span>
            <input className='inputForNumber' onChange={(ev) => this.updateState('monthToPrint', ev.target.value)} type='text' value={monthToPrint}/>
          </div>
          <div className='inputContainerMonthAndYear'>
            <span className='spanTitle'>Año</span>
            <input className='inputForNumber' onChange={(ev) => this.updateState('yearToPrint', ev.target.value)} type='number' value={yearToPrint}/>
          </div>
        </div>
        <div className={(peopleList.length > 0) ? 'hide' : 'monthAndYearContainer'}>
          <span style={{ color: '#878b85' }}>Agregue Personas...</span>
        </div>
        <form>
          <PeopleForm
            peopleList={peopleList}
            onInputChange={this.updateState}
            onClick={this.deletingPerson}/>
        </form>
        <div className='printerButtonContainer onlyScreenView'>
          <div className={'successButton bigButtons'} onClick={window.print}>Imprimir</div>
        </div>
        <div className='textareaContainer'>
          <span>Texto a Imprimir</span>
          <textarea
            className='textarea'
            onChange={(ev) => this.updateState('textToPrint', ev.target.value)}
            defaultValue={textToPrint}/>
        </div>
        <PeopleTextToPrint
          value={textToPrint}
          peopleList={peopleList}
          date={{
            day: dayToPrint,
            month: monthToPrint,
            year: yearToPrint,
          }}/>
      </div>
    );
  }
}

export default App;

// Avisar en el modal si una persona ya está en la lista

// El ClassName del div del this.state.addPersonsButtonClicked hacerlo sin repetir el overlay en ambos condicionales
// El ClassName de div principal del modal hacerlo sin repetir el globalAlert en ambos condicionales
// Cambiar los nombres del State
// Chequear los nombres de las funciones
// Hacer un par de clases más genéricas
