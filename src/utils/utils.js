import { homedir } from 'node:os';

export const extractArgument = (userInput, argNumber) => {
  const args = userInput.trim().match(/(?:[^\s"]+|"[^"]*")/g) || [];

  let argument = args[argNumber] || '';
  if (argument.startsWith('"') && argument.endsWith('"')) {
    argument = argument.substring(1, argument.length - 1);
  }

  return argument;
};
export const logWithColor = (text, color) => {
  const colors = {
    reset: '\x1b[0m',
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
  };

  console.log(`${colors[color]}${text}${colors.reset}`);
};

export const getHomeDir = () => {
  return homedir();
};