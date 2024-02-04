import { getHomeDir } from '../../utils/utils.js';

export const homedir = () => {
  console.log(`Home directory: ${getHomeDir()}`);
};
