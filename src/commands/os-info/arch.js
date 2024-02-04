import { arch as nodeArch } from 'node:os';

export const arch = () => {
  console.log(`Node.js binary architecture: ${nodeArch()}`);
};
