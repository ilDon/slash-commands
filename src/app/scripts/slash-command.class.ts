import { BuiltInCommands } from './built-in-commands.const';

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
   */
  public static extractSlashCommand(input: string): string | null {
    // Check if the input string contains a forward slash
    if (!input.includes('/'))
      return null;

    // Extracts the word after the slash
    const command = input.split('/')[1].split(' ')[0];

    if (command.length === 0 || !BuiltInCommands[command])
      return null;

    if (BuiltInCommands[command].params === 0)
      return command;

    const params = input.split('/' + command)[1].split(' ').filter(param => param !== '');

    if (params.length === BuiltInCommands[command].params)
      return command;

    return null;
  }

  public run(): string {
    this.result = BuiltInCommands[this.command].method(this.fullInput);
    return this.result;
  }

}
