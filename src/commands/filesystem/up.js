import { chdir } from 'node:process';

export const up = () => {
  chdir('..');
};
