import { getCurrentDirectory } from './directory.js';
import { logWithColor } from './utils/utils.js';

export const getUsernameFromArgs = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));

  if (!usernameArg) {
    logWithColor(
      `Oops! It looks like you forgot to provide a username argument. Please start the program again using the following command:\nnpm run start -- --username=your_username`,
      'red'
    );
    process.exit(1);
  }

  const username = usernameArg.substring(usernameArg.indexOf('=') + 1);

  if (!username) {
    logWithColor(`Oops! It looks like you provided an empty username. Please provide a valid username.`, 'red');
    process.exit(1);
  }

  return username;
};

export const greetUser = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${getCurrentDirectory()}`);
};
