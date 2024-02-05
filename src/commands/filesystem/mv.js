import { cp } from './cp.js';
import { rm } from './rm.js';

export const mv = async (userInput) => {
  await cp(userInput);
  await rm(userInput);
};
