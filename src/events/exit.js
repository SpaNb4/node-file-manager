import { logWithColor } from '../utils/utils.js';

export const setExitEvents = (username) => {
  const message = `Thank you for using File Manager, ${username}, goodbye!`;

  process.on('SIGINT', () => {
    process.exit(0);
  });

  process.on('exit', () => {
    logWithColor(message, 'yellow');
  });
};
