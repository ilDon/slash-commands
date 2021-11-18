import { SupportedCommands } from './supported-commands.const';

export class SlashCommand {

  /** 
   * The full string to set as the value of the input after the slash command has run
  */
  private result: string;

  /**
   * Accepts a full string in which a slash command is present, parses it and returns the result
   * @param fullInput The full string to parse
   */
  constructor(
    private fullInput: string,
    private command: string
  ) { }

  /**
   * Static method that checks if a string contains a supported command
   * TODO Needs improvements as it doesn't work if the user adds the command in the middle of the string
   */
  public static extractSlashCommand(input: string): string | null {
    // Check if the input string contains a forward slash
    if (!input.includes('/'))
      return null;

    // Extracts the word after the slash. 
    const command = input.split('/').filter((word): boolean => {
      // extracts the first word boundary
      const matchSequence = word.match(/^[a-zA-Z]+\b/);

      if (matchSequence === null)
        return false;

      return Object.keys(SupportedCommands).includes(matchSequence[0]);
    })[0];

    if (!command || command.length === 0 || !SupportedCommands[command])
      return null;

    if (SupportedCommands[command].params === 0)
      return command;

    const params = input.split('/' + command)[1].split(' ').filter(param => param !== '');

    if (params.length === SupportedCommands[command].params)
      return command;

    return null;
  }

  /**
   * Runs the command and applies the result to the input field.
   * 
   * @remarks As of now it direcly manipulates the DOM to avoid async issues.
   */
  public run(): string {
    if (typeof SupportedCommands[this.command].method === 'function') {
      const method = SupportedCommands[this.command].method as (input: string) => string;
      this.result = method(this.fullInput);
    } else if (typeof SupportedCommands[this.command].method === 'string') {
      // Creates a function based on the code provided by the user, removing access to window
      const func = new Function("return " + `function (input) {
        const window = {};
        const document = {};
         ${SupportedCommands[this.command].method} }`)();

      this.result = func.apply({}, [this.fullInput]);

    }

    return this.result;
  }

}
