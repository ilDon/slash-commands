import { SupportedCommands } from './supported-commands.const';


export function handleAddCommandForm() {
  const commandName = document.querySelector('#command-name')['value'];
  const description = document.querySelector('#description')['value'];
  const jsCode = document.querySelector('#js-code')['value'];
  const params = document.querySelector('#params')['value'];

  if (!SupportedCommands[commandName])
    SupportedCommands[commandName] = {
      description: description,
      params: parseInt(params, 10),
      method: jsCode
    }

  const list = document.getElementById('listOfCommands');

  const liElement = document.createElement("li");
  const textnode = document.createTextNode(`/${commandName}: ${description}`);
  liElement.appendChild(textnode);
  list.appendChild(liElement);
}