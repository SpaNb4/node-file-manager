import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { extractArgument } from '../../utils/utils.js';

export const cp = async (userInput) => {
  const parsedSourcePath = extractArgument(userInput, 1);
  const parsedDestPath = extractArgument(userInput, 2);
  const sourceFilePath = path.resolve(cwd(), parsedSourcePath);
  const destFolderPath = path.resolve(cwd(), parsedDestPath);

  const sourceFilename = path.basename(sourceFilePath);
  const destFilePath = path.resolve(destFolderPath, sourceFilename);
  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, destStream);
};
