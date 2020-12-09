const word = document.getElementById('word'),
  number = document.getElementById('number'),
  direction = document.getElementById('direction'),
  button = document.getElementById('result-button');

const inputs = {};

function saveValues({ name, value }) {
  inputs[name] = value;
}

function changePushWordFromDirection({ direction, word, number }) {
  const newNumber = number > word.length ? (number - word.length) : number

  if (direction === "L") {
    const slicedFrontString = word.slice(0, newNumber);

    const slicedBackString = word.slice(newNumber);

    const newWord = slicedBackString.concat(slicedFrontString)

    return newWord;
  }
  if (direction === "R") {
    const slicedBackString = word.slice(-newNumber);

    const slicedFrontString = word.slice(0, word.length - newNumber);

    const newWord = slicedBackString.concat(slicedFrontString)

    return newWord;
  }
}

function wordPush({ word, number, direction }) {
  const upperDirection = direction.toUpperCase();

  if (number < 0) {
    const absoluteNumber = -number;

    const newDirection = upperDirection === "L" ? "R" : upperDirection || upperDirection === "R" ? "L" : upperDirection;

    return changePushWordFromDirection({ direction: newDirection, word, number: absoluteNumber })
  }
  if (number > 0) {
    return changePushWordFromDirection({ direction: upperDirection, word, number })
  }
}

function handleChange(e) {
  const { name, value } = e.target;

  saveValues({ name, value });
}

function handleResult() {
  if (Object.values(inputs).length === 3) {
    const result = wordPush(inputs);

    return window.alert(result);
  }
}

function init() {
  word.addEventListener('input', handleChange);
  number.addEventListener('input', handleChange);
  direction.addEventListener('input', handleChange);
  button.addEventListener('click', handleResult);
}

init();


