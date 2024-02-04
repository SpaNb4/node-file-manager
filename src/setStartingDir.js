import path from 'node:path';
import { chdir } from 'node:process';
import { getHomeDir } from './utils/utils.js';

export const setStartingDir = () => {
  const userHomeDir = getHomeDir();
  // TODO remove 'Desktop' from path
  const startingDir = path.join(userHomeDir, 'Desktop');

  chdir(startingDir);
};
