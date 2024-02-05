import { getCurrentDirectory } from '../../directory.js';
import { cp } from './cp.js';
import { rm } from './rm.js';

export const mv = async (userInput) => {
  await cp(userInput, getCurrentDirectory());
  await rm(userInput, getCurrentDirectory());
};
