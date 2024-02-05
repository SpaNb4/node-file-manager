import fs from 'node:fs/promises';
import path from 'node:path';
import { getCurrentDirectory } from '../../directory.js';

export const ls = async () => {
  const files = await fs.readdir(getCurrentDirectory());
  const fileInfoArray = [];

  const folders = [];
  const filesList = [];
  for (const file of files) {
    const fileStat = await fs.stat(path.resolve(getCurrentDirectory(), file));
    const isFile = fileStat.isFile();
    const fileType = isFile ? 'file' : 'directory';
    const fileInfo = { Name: file, Type: fileType };

    if (fileType === 'directory') {
      folders.push(fileInfo);
    } else {
      filesList.push(fileInfo);
    }
  }

  folders.sort((a, b) => a.Name.localeCompare(b.Name));
  filesList.sort((a, b) => a.Name.localeCompare(b.Name));

  fileInfoArray.push(...folders, ...filesList);

  console.table(fileInfoArray, ['Name', 'Type']);
};
