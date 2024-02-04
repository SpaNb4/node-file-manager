import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import { extractArgument } from '../../utils/utils.js';

export const rn = async (userInput) => {
  const parsedSourcePath = extractArgument(userInput, 1);
  const parsedDestPath = extractArgument(userInput, 2);

  const destFilename = path.basename(parsedDestPath);
  const sourceFilePath = path.resolve(cwd(), parsedSourcePath);
  const sourceFileDir = path.dirname(sourceFilePath);
  const renamedFilePath = path.resolve(sourceFileDir, destFilename);

  await fs.rename(sourceFilePath, renamedFilePath);
};
