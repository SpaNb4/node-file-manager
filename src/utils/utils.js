import fs from 'node:fs/promises';
import { homedir } from 'node:os';

export const extractArguments = (userInput) => {
  return userInput.trim().match(/(?:[^\s"]+|"[^"]*")/g) || [];
};

export const extractArgument = (userInput, argNumber) => {
  const args = extractArguments(userInput);
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

export const checkFileExists = async (filePath) => {
  try {
    await fs.access(filePath);
  } catch (error) {
    throw new Error('File does not exist.');
  }
};
