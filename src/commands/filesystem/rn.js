import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import { extractArgument } from '../../utils/utils.js';

export const rn = async (userInput) => {
  const parsedSourcePath = extractArgument(userInput, 1);
  const renamedFilename = extractArgument(userInput, 2);

  const sourceFilePath = path.join(cwd(), parsedSourcePath);
  const sourceFileDir = path.dirname(sourceFilePath);
  const renamedFilePath = path.join(sourceFileDir, renamedFilename);

  await fs.rename(sourceFilePath, renamedFilePath);
};
