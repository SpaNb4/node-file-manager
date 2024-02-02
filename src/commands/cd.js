import { chdir } from 'node:process';
import { extractArgument } from '../utils/utils.js';

export const cd = (userInput) => {
  const parsedPath = extractArgument(userInput, 1);

  chdir(parsedPath);
};
