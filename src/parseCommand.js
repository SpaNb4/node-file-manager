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
  EXIT: '.exit',
};

export const parseCommand = (userInput) => {
  return extractArgument(userInput, 0);
};
