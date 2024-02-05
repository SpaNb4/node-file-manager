import { extractArgument, extractArguments } from '../utils/utils.js';

export const COMMANDS = {
  UP: { commandName: 'up', expectedArgs: 0 },
  CD: { commandName: 'cd', expectedArgs: 1 },
  LS: { commandName: 'ls', expectedArgs: 0 },
  CAT: { commandName: 'cat', expectedArgs: 1 },
  ADD: { commandName: 'add', expectedArgs: 1 },
  RN: { commandName: 'rn', expectedArgs: 2 },
  CP: { commandName: 'cp', expectedArgs: 2 },
  MV: { commandName: 'mv', expectedArgs: 2 },
  RM: { commandName: 'rm', expectedArgs: 2 },
  HASH: { commandName: 'hash', expectedArgs: 1 },
  COMPRESS: { commandName: 'compress', expectedArgs: 2 },
  DECOMPRESS: { commandName: 'decompress', expectedArgs: 2 },
  EXIT: { commandName: '.exit', expectedArgs: 0 },
  OS: { commandName: 'os', expectedArgs: 1 },
  OS_EOL: { commandName: '--EOL' },
  OS_CPUS: { commandName: '--cpus' },
  OS_HOMEDIR: { commandName: '--homedir' },
  OS_USERNAME: { commandName: '--username' },
  OS_ARCH: { commandName: '--architecture' },
};

export const checkArgumentCount = (command, userInput) => {
  for (const key in COMMANDS) {
    if (COMMANDS[key].commandName === command) {
      const expectedArgs = COMMANDS[key].expectedArgs;
      const args = extractArguments(userInput);

      if (args.length - 1 !== expectedArgs) {
        throw new Error(`Incorrect number of arguments provided. Expected ${expectedArgs} arguments.`);
      }
    }
  }
};

export const parseCommand = (userInput) => {
  const command = extractArgument(userInput, 0);

  checkArgumentCount(command, userInput);

  if (command === COMMANDS.OS.commandName) {
    const argument = extractArgument(userInput, 1);
    return argument;
  }

  return command;
};
