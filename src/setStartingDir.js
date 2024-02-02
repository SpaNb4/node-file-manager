import os from 'node:os';
import path from 'node:path';
import { chdir } from 'node:process';

export const setStartingDir = () => {
  const userHomeDir = os.homedir();
  // TODO remove 'Desktop' from path
  const startingDir = path.join(userHomeDir, 'Desktop');

  chdir(startingDir);
};
