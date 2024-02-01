import { argv, stdin, stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';
import os from 'node:os';
import path from 'node:path';
import { createReadStream, close, createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const getUsernameFromArgs = () => {
  const args = argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--username=')) {
      return args[i].substring(args[i].indexOf('=') + 1);
    }
  }
};

const start = async () => {
  const username = getUsernameFromArgs();
  const userHomeDir = os.homedir();
  const startingDir = userHomeDir;
  // TODO remove 'Desktop' from path
  let workingDirectory = path.join(startingDir, 'Desktop');
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${workingDirectory}`);

  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });

  process.stdin.on('data', async (data) => {
    const userInput = data.toString().replace(/(\r\n|\n|\r)/gm, '');

    let command;
    if (userInput === 'up') {
      command = 'up';
    } else if (userInput.startsWith('cd ')) {
      command = 'cd';
    } else if (userInput === 'ls') {
      command = 'ls';
    } else if (userInput.startsWith('cat ')) {
      command = 'cat';
    } else if (userInput.startsWith('add ')) {
      command = 'add';
    } else if (userInput.startsWith('rn ')) {
      command = 'rn';
    } else if (userInput.startsWith('cp ')) {
      command = 'cp';
    } else if (userInput.startsWith('mv ')) {
      command = 'mv';
    } else if (userInput.startsWith('rm ')) {
      command = 'rm';
    }

    // TODO and ".exit" command
    // try catch ?
    // rewrite "rn" to accept filename as a second argument
    // same as above folr "cp" and others
    if (command === 'up') {
      workingDirectory = path.join(workingDirectory, '../');
    } else if (command === 'cd') {
      const parsedPath = userInput.substring(3);
      const newDirectory = path.join(workingDirectory, parsedPath);

      if (existsSync(newDirectory)) {
        workingDirectory = newDirectory;
      }
    } else if (command === 'ls') {
      const files = await fs.readdir(workingDirectory);
      const arr = [];
      for (const file of files) {
        const fileStat = await fs.lstat(path.join(workingDirectory, file));
        const isFile = fileStat.isFile();
        const fileType = isFile ? 'file' : 'directory';

        arr.push({ Name: file, Type: fileType });
      }

      console.table(arr, ['Name', 'Type']);
    } else if (command === 'cat') {
      const parsedPath = userInput.substring(4);
      const sourceFilePath = path.join(workingDirectory, parsedPath);
      const sourceStream = createReadStream(sourceFilePath);

      sourceStream.pipe(stdout);
    } else if (command === 'add') {
      const filename = userInput.substring(4);
      const filePath = path.join(workingDirectory, filename);
      await fs.writeFile(filePath, '', { flag: 'wx' });
    } else if (command === 'rn') {
      const parsedSourcePath = userInput.substring(3, userInput.indexOf(' ', 3));
      const renamedFilename = userInput.substring(userInput.indexOf(' ', 3) + 1);
      const sourceFilePath = path.join(workingDirectory, parsedSourcePath);
      const renamedFilePath = path.join(workingDirectory, renamedFilename);

      await fs.rename(sourceFilePath, renamedFilePath);
    } else if (command === 'cp') {
      const parsedSourcePath = userInput.substring(3, userInput.indexOf(' ', 3));
      const renamedFilename = userInput.substring(userInput.indexOf(' ', 3) + 1);
      const sourceFilePath = path.join(workingDirectory, parsedSourcePath);
      const renamedFilePath = path.join(workingDirectory, renamedFilename);

      const sourceStream = createReadStream(sourceFilePath);
      const destStream = createWriteStream(renamedFilePath);
      // console.log('sourceFilePath', sourceFilePath);
      // console.log('renamedFilePath', renamedFilePath);

      await pipeline(sourceStream, destStream);
    } else if (command === 'mv') {
      const parsedSourcePath = userInput.substring(3, userInput.indexOf(' ', 3));
      const renamedFilename = userInput.substring(userInput.indexOf(' ', 3) + 1);
      const sourceFilePath = path.join(workingDirectory, parsedSourcePath);
      const renamedFilePath = path.join(workingDirectory, renamedFilename);

      const sourceStream = createReadStream(sourceFilePath);
      const destStream = createWriteStream(renamedFilePath);

      await pipeline(sourceStream, destStream);
      await fs.unlink(sourceFilePath);
    } else if (command === 'mv') {
      const parsedSourcePath = userInput.substring(3);
      const sourceFilePath = path.join(workingDirectory, parsedSourcePath);

      await fs.unlink(sourceFilePath);
    } else {
    }

    console.log(`You are currently in ${workingDirectory}`);
  });
};

start();
