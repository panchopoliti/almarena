export function addPeopleToAList(list, inputText) {
  const peopleToAddToList = countingPersonsFromInput(inputText);
  const returnList = list.slice();

  peopleToAddToList.forEach((person) => {

    if (!returnList.includes(person)) {
      returnList.push(person);
    }

  });

  return returnList;
}

export function addPeopleToIncomeList(list, inputText) {
  const peopleToAddToList = countingPersonsFromInput(inputText);
  const returnList = list.slice();

  peopleToAddToList.forEach((person) => {

    if (!returnList.includes(person)) {
      returnList.push({
        name: person,
        mount: 0,
      });
    }

  });

  return returnList;
}

export function addMountToIncomeList(list, mount, personIdx) {
  const returnList = list.slice();
  returnList[personIdx].mount = mount;

  return returnList;
}

export function countingPersonsFromInput(inputText) {

  const persons = detectingCommasInInput(inputText);

  if (persons.length !== 0) {
    persons.pop();
  }

  return deleteWhiteSpaces(persons);
}

export function deleteErasedPersonsFromList(list, updatedList) {
  const returnList = list.slice();

  for (let i = list.length; i >= 0; i--) {

    if (!updatedList.includes(list[i])) {
      returnList.splice(i, 1);
    }

  }
  return returnList;
}

export function detectingCommasInInput(inputValueToDetect) {
  return (inputValueToDetect.includes(',')) ? inputValueToDetect.split(',') : [];
}

export function deleteWhiteSpaces(list) {
  return list.map((item) => {
    return item.trim();
  });
}

export function getDayMonthAndYear() {
  const today = new Date();

  const monthNumber = today.getMonth();

  return {
    day: today.getDate(),
    month: getMonth(monthNumber),
    year: today.getFullYear(),
  }
}

export function getMonth(month) {
  switch (month) {
    case 0:
      return 'Enero';
    case 1:
      return 'Febrero';
    case 2:
      return 'Marzo';
    case 3:
      return 'Abril';
    case 4:
      return 'Mayo';
    case 5:
      return 'Junio';
    case 6:
      return 'Julio';
    case 7:
      return 'Agosto';
    case 8:
      return 'Septiembre';
    case 9:
      return 'Octubre';
    case 10:
      return 'Noviembre';
    case 11:
      return 'Diciembre';
    default:
      return 'Enero';
  }
}

export function findRowOfPersonInTable(idx, selector) {
  return document.querySelector(`[${selector}="${idx}"]`);
}
