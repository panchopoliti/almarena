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

export function deleteRowInTable(idx, selector) {
  document.querySelector(`[${selector}="${idx}"]`).remove()
}
