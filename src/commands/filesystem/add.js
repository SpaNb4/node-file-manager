import fs from 'node:fs/promises';
import path from 'node:path';
import { getCurrentDirectory } from '../../directory.js';
import { extractArgument } from '../../utils/utils.js';

export const add = async (userInput) => {
  const parsedFilename = extractArgument(userInput, 1);
  const filename = path.basename(parsedFilename);
  const filePath = path.resolve(getCurrentDirectory(), filename);

  await fs.writeFile(filePath, '', { flag: 'wx' });
};
