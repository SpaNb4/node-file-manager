import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { extractArgument } from '../utils/utils.js';
import { cwd } from 'node:process';

export const cp = async (userInput) => {
  const parsedSourcePath = extractArgument(userInput, 1);
  const destFolder = extractArgument(userInput, 2);
  const sourceFilePath = path.join(cwd(), parsedSourcePath);
  const destFolderPath = path.join(cwd(), destFolder);

  const sourceFilename = path.basename(sourceFilePath);
  const destFilePath = path.join(destFolderPath, sourceFilename);
  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, destStream);
};
