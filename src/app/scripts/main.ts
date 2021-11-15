import { BuiltInCommands } from './built-in-commands.const';
import { SlashCommand } from './slash-command.class';

const idFieldToWatch = '#commandInput';

document.querySelector(idFieldToWatch).addEventListener("input", invokeSlashCommand);

/**
 * If the string contains a command, inveokes SlashCommand
 * @param e The HTML event with the target and value to be processed
 */

function invokeSlashCommand(e): void {
  let input = e.target.value;
  setValueOnHtmlEle('intput', input);

  const command = SlashCommand.extractSlashCommand(input)

  if (command !== null) {
    input = new SlashCommand(input, command).run();
    setValueOnHtmlEle('hasCommand', command ? 'true' : 'false');
    document.querySelector(idFieldToWatch)['value'] = input;
  }

  setValueOnHtmlEle('hasCommand', command ? 'true' : 'false');
  setValueOnHtmlEle('output', input);
}

function setValueOnHtmlEle(idEle: string, value: string): void {
  const htmlEle = document.getElementById(idEle);
  htmlEle.innerText = `${value}`
}

function createListOfSupportedCommands(): void {
  const list = document.getElementById('listOfCommands');
  for (const command in BuiltInCommands) {
    const liElement = document.createElement("li");
    const textnode = document.createTextNode(`/${command}: ${BuiltInCommands[command].description}`);
    liElement.appendChild(textnode);
    list.appendChild(liElement);
  }
}

createListOfSupportedCommands();