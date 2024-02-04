import { extractArgument } from './utils/utils.js';

export const COMMANDS = {
  UP: 'up',
  CD: 'cd',
  LS: 'ls',
  CAT: 'cat',
  ADD: 'add',
  RN: 'rn',
  CP: 'cp',
  MV: 'mv',
  RM: 'rm',
  HASH: 'hash',
  COMPRESS: 'compress',
  DECOMPRESS: 'decompress',
  EXIT: '.exit',
  OS: 'os',
  OS_EOL: '--EOL',
  OS_CPUS: '--cpus',
  OS_HOMEDIR: '--homedir',
  OS_USERNAME: '--username',
  OS_ARCH: '--architecture',
};

export const parseCommand = (userInput) => {
  const command = extractArgument(userInput, 0);

  if (command === COMMANDS.OS) {
    const argument = extractArgument(userInput, 1);
    return argument;
  }

  return command;
};
