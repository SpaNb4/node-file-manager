import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import { extractArgument } from '../../utils/utils.js';

export const rm = async (userInput) => {
  const parsedSourcePath = extractArgument(userInput, 1);
  const sourceFilePath = path.join(cwd(), parsedSourcePath);

  await fs.unlink(sourceFilePath);
};
