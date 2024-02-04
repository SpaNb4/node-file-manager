import { cwd } from 'node:process';
import { compress } from '../commands/archiving/compress.js';
import { decompress } from '../commands/archiving/decompress.js';
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
import { COMMANDS, parseCommand } from '../parseCommand.js';
import { logWithColor } from '../utils/utils.js';

export const setInputEvent = () => {
  process.stdin.on('data', async (data) => {
    const userInput = data.toString().replace(/(\r\n|\n|\r)/gm, '');

    const command = parseCommand(userInput);

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

        case COMMANDS.HASH:
          await calculateHash(userInput);
          break;

        case COMMANDS.COMPRESS:
          await compress(userInput);
          break;

        case COMMANDS.DECOMPRESS:
          await decompress(userInput);
          break;

        case COMMANDS.OS_EOL:
          eol();
          break;

        case COMMANDS.OS_CPUS:
          cpus();
          break;

        case COMMANDS.OS_HOMEDIR:
          homedir();
          break;

        case COMMANDS.OS_USERNAME:
          username();
          break;

        case COMMANDS.OS_ARCH:
          arch();
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

    console.log(`\nYou are currently in ${cwd()}`);
  });
};
