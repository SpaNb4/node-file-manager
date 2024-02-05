import { compress } from '../commands/archiving/compress.js';
import { decompress } from '../commands/archiving/decompress.js';
import { COMMANDS, parseCommand } from '../commands/commands.js';
import { add } from '../commands/filesystem/add.js';
import { cat } from '../commands/filesystem/cat.js';
import { cd } from '../commands/filesystem/cd.js';
import { cp } from '../commands/filesystem/cp.js';
import { ls } from '../commands/filesystem/ls.js';
import { mv } from '../commands/filesystem/mv.js';
import { rm } from '../commands/filesystem/rm.js';
import { rn } from '../commands/filesystem/rn.js';
import { up } from '../commands/filesystem/up.js';
import { calculateHash } from '../commands/hash/hash.js';
import { arch } from '../commands/os-info/arch.js';
import { cpus } from '../commands/os-info/cpus.js';
import { eol } from '../commands/os-info/eol.js';
import { homedir } from '../commands/os-info/homedir.js';
import { username } from '../commands/os-info/username.js';
import { getCurrentDirectory } from '../directory.js';
import { logWithColor } from '../utils/utils.js';

export const setInputEvent = () => {
  process.stdin.on('data', async (data) => {
    try {
      const userInput = data.toString().replace(/(\r\n|\n|\r)/gm, '');
      const command = parseCommand(userInput);

      switch (command) {
        case COMMANDS.UP.commandName:
          up();
          break;

        case COMMANDS.CD.commandName:
          cd(userInput);
          break;

        case COMMANDS.LS.commandName:
          await ls();
          break;

        case COMMANDS.CAT.commandName:
          await cat(userInput);
          break;

        case COMMANDS.ADD.commandName:
          await add(userInput);
          break;

        case COMMANDS.RN.commandName:
          await rn(userInput);
          break;

        case COMMANDS.CP.commandName:
          await cp(userInput);
          break;

        case COMMANDS.MV.commandName:
          await mv(userInput);
          break;

        case COMMANDS.RM.commandName:
          await rm(userInput);
          break;

        case COMMANDS.HASH.commandName:
          await calculateHash(userInput);
          break;

        case COMMANDS.COMPRESS.commandName:
          await compress(userInput);
          break;

        case COMMANDS.DECOMPRESS.commandName:
          await decompress(userInput);
          break;

        case COMMANDS.OS_EOL.commandName:
          eol();
          break;

        case COMMANDS.OS_CPUS.commandName:
          cpus();
          break;

        case COMMANDS.OS_HOMEDIR.commandName:
          homedir();
          break;

        case COMMANDS.OS_USERNAME.commandName:
          username();
          break;

        case COMMANDS.OS_ARCH.commandName:
          arch();
          break;

        case COMMANDS.EXIT.commandName:
          process.exit(0);

        default:
          logWithColor('Invalid input', 'red');
          break;
      }
    } catch (err) {
      logWithColor(`Operation failed\n${err.message}`, 'red');
    }

    console.log(`\nYou are currently in ${getCurrentDirectory()}`);
  });
};
