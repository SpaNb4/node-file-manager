import { createReadStream } from 'node:fs';
import path from 'node:path';
import { cwd, stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { extractArgument } from '../utils/utils.js';

export const cat = async (userInput) => {
  const parsedPath = extractArgument(userInput, 1);
  const sourceFilePath = path.join(cwd(), parsedPath);
  const sourceStream = createReadStream(sourceFilePath);

  await pipeline(sourceStream, stdout);
};
