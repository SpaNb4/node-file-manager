import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';
import { checkFileExists, extractArgument } from '../../utils/utils.js';

export const compress = async (userInput) => {
  const sourceFilePath = extractArgument(userInput, 1);
  const destFilePath = extractArgument(userInput, 2);

  await checkFileExists(sourceFilePath);

  const gzip = createBrotliCompress();
  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, gzip, destStream);
};
