# Slash commands Project Plan

Project plan for developing a slash command system. 


# Requirements

- Must haves: 

    - The slash commands system should allow users to type “slash commands” (e.g. /incrementInt) into a text area of some sort and perform actions based on the command that was entered.

- optional: 

    - A slash command “/addCommand” which pops up a window for users to create their own command in JavaScript.
    - Custom commands should be stored locally to preserve them between sessions.
    - Custom commands should be able to be deleted.


# Assumptions

## Slash command logic


- The slash command must entirely run on the client side as a self-contained app.
- A forward slash (/) introduces the slash commands.
- No spaces are allowed in the command name.
- Commands should be case-sensitive, to avoid false positives.
- After the command runs, the command should be removed from the input field leaving only the result produced by the command.
- Both pre-existing and new commands should be able to be used.
- Commands should be able to be used in any order.
- To save resources, commands should be run only once all params have been processed.

## Implementation 

- The project should use TypeScript.
- The project should be bundled to run in the browser as a static website.
- Function performing the commands should be self-contained. All logic should be in the function and the only parameter should be the supplied text. In this way we can allow users to create their own commands with the same logic. 
- Each function implementing a command should take care of removing the command from the string. In this way we can leave to users the decision to clean, or not, the input text in custom commands.

## Libraries

To speed up development, I will use the following libraries:

- Project initialization and build process: [YASSB](https://yassb-foss.github.io/) this CLI app that I developed makes it quick to set up a new project and build it as a static site.
- UI: Bootstrap 5 (both CSS and JS) via CDN
- JS: vanilla JavaScript. We won't use any other unnecessary JS libraries to ensure that the code can be easily integrated into any other project.

# Security

- Use of `eval` is not allowed in any form.
- User defined commands should be run in a sandboxed environment (they will not be able to access the DOM or other variables outside the command).

# Milestones/Roadmap

v. 1.0.0
- [X] Develop the basic logic to listen to inputs in one or more input fields.
- [X] Parse the text while it is entered and invoke the built-in commands, if any.
- [X] Add the optional "/addCommand" command (via modal).

Next features to be evaluated:
- [ ] Improve security by further scoping custom commands to a sandboxed environment.
- [ ] Improve error handling for built-in and custom commands.
- [ ] Properly validate the add command form.
