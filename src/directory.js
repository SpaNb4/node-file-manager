import { chdir, cwd } from 'node:process';
import { getHomeDir } from './utils/utils.js';

export const setStartingDir = () => {
  const startingDir = getHomeDir();

  chdir(startingDir);
};

export const getCurrentDirectory = () => {
  return cwd();
};
