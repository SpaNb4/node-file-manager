import { homedir } from 'node:os';

export const extractArgument = (userInput, argNumber) => {
  const args = userInput.trim().split(/\s+/);
  return args[argNumber];
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
