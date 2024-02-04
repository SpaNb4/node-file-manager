import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';
import { extractArgument } from '../../utils/utils.js';

export const decompress = async (userInput) => {
  const sourceFilePath = extractArgument(userInput, 1);
  const destFilePath = extractArgument(userInput, 2);

  const gzip = createBrotliDecompress();
  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, gzip, destStream);
};
