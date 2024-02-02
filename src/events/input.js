import { COMMANDS, parseCommand } from '../parseCommand.js';
import { logWithColor } from '../utils/utils.js';

export const setInputEvent = () => {
  process.stdin.on('data', async (data) => {
    const userInput = data.toString().replace(/(\r\n|\n|\r)/gm, '');

    const command = parseCommand(userInput);

    // TODO add support for filenames with spaces
    try {
      switch (command) {
        case COMMANDS.UP:
          up();
          break;

        case COMMANDS.CD:
          cd(userInput);
          break;

        case COMMANDS.LS:
          await ls();
          break;

        case COMMANDS.CAT:
          await cat(userInput);
          break;

        case COMMANDS.ADD:
          await add(userInput);
          break;

        case COMMANDS.RN:
          await rn(userInput);
          break;

        case COMMANDS.CP:
          await cp(userInput);
          break;

        case COMMANDS.MV:
          await mv(userInput);
          break;

        case COMMANDS.RM:
          await rm(userInput);
          break;

        case COMMANDS.EXIT:
          process.exit(0);

        default:
          logWithColor('Invalid input', 'red');
          break;
      }
    } catch (err) {
      logWithColor(`Operation failed\n${err.message}`, 'red');
    }

    console.log(`You are currently in ${cwd()}`);
  });
};
