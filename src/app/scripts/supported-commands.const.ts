interface CommandsInfo {
  params: number;
  description: string;
  method: string | ((input) => string);
}

interface CommandsStore {
  [nameOfCommand: string]: CommandsInfo;
}


const toUpperCaseCommand = (input: string): string => {
  // Extract the word before the string "/uppercase"
  const textBeforeTheCommand = input.split('/uppercase')[0];
  const words = textBeforeTheCommand.split(' ');

  // If there are no words, return an empty string
  if (words.length === 0)
    return '';

  // If there is only one word, return the word in uppercase
  if (words.length === 1)
    return words[0].toUpperCase();

  let lastWordIndex = words.length - 1;

  // Check that the last word only contains letters
  while (!words[lastWordIndex].match(/^[a-zA-Z]+$/) && lastWordIndex > -1)
    lastWordIndex--;

  if (lastWordIndex > -1)
    words[lastWordIndex] = words[lastWordIndex].toUpperCase();

  return words.join(' ');
}

const toIntCommand = (input: string): string => {
  // Extract the word before the string "/uppercase"
  const textBeforeTheCommand = input.split('/toInt')[0];
  const words = textBeforeTheCommand.split(' ');

  // If there are no words, return an empty string
  if (words.length === 0)
    return '';

  const isNumbers = (n: string): boolean => Array.isArray(n.match(/^[0-9.,]+$/));

  // If there is only one word, return the word in uppercase
  if (words.length === 1) {
    if (isNumbers(words[0]))
      return `${parseInt(words[0], 10)}`;
    return words[0];
  }

  let lastWordIndex = words.length - 1;

  // Check that the last word only contains numbers
  while (!isNumbers(words[lastWordIndex]) && lastWordIndex > -1)
    lastWordIndex--;

  if (lastWordIndex > -1)
    words[lastWordIndex] = `${parseInt(words[lastWordIndex], 10)}`;

  return words.join(' ');
}

const sum = (input: string): string => {
  // Extract the word before the string "/uppercase"
  const textBeforeTheCommand = input.split('/sum')[0];
  const textAfterTheCommand = input.split('/sum')[1];

  const numbersArr = textAfterTheCommand.split(' ').filter(n => n !== '');

  // Converts the numbers to numbers and sums them
  const result = parseFloat(numbersArr[0]) + parseFloat(numbersArr[1]);

  return `${textBeforeTheCommand} ${result}`;
}

const addCommand = (input: string): string => {
  console.log('addCommand ~ input', input);
  const openBtn = document.getElementById('open-modal-btn');
  openBtn.dispatchEvent(new CustomEvent('click', {}));

  return input.replace('/addCommand', '');
}

export const SupportedCommands: CommandsStore = {
  addCommand: {
    params: 0,
    description: 'Opens a modal window to add a custom command.',
    method: addCommand
  },
  uppercase: {
    params: 0,
    description: 'Converts the previous word to uppercase.',
    method: toUpperCaseCommand
  },
  toInt: {
    params: 0,
    description: 'Converts the previous float number to a int.',
    method: toIntCommand
  },
  sum: {
    params: 2,
    description: 'Sums the two numbers following the command.',
    method: sum
  },
};