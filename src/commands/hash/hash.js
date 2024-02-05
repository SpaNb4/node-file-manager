import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { extractArgument } from '../../utils/utils.js';

export const calculateHash = async (userInput) => {
  const sourceFilePath = extractArgument(userInput, 1);
  const hash = createHash('sha256');
  const input = createReadStream(sourceFilePath);

  await pipeline(input, hash.setEncoding('hex'), stdout, { end: false });
};
