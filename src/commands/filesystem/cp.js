import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { getCurrentDirectory } from '../../directory.js';
import { checkFileExists, extractArgument } from '../../utils/utils.js';

export const cp = async (userInput) => {
  const parsedSourcePath = extractArgument(userInput, 1);
  const parsedDestPath = extractArgument(userInput, 2);
  const sourceFilePath = path.resolve(getCurrentDirectory(), parsedSourcePath);
  const destFolderPath = path.resolve(getCurrentDirectory(), parsedDestPath);

  await checkFileExists(sourceFilePath);

  const sourceFilename = path.basename(sourceFilePath);
  const destFilePath = path.resolve(destFolderPath, sourceFilename);
  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, destStream);
};
