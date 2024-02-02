import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import { extractArgument } from '../utils/utils.js';

export const add = async (userInput) => {
  const filename = extractArgument(userInput, 1);
  const filePath = path.join(cwd(), filename);

  await fs.writeFile(filePath, '', { flag: 'wx' });
};
