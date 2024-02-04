import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';

export const ls = async () => {
  const files = await fs.readdir(cwd());
  const fileInfoArray = [];

  // TODO add file sorting
  for (const file of files) {
    const fileStat = await fs.lstat(path.join(cwd(), file));
    const isFile = fileStat.isFile();
    const fileType = isFile ? 'file' : 'directory';

    fileInfoArray.push({ Name: file, Type: fileType });
  }

  console.table(fileInfoArray, ['Name', 'Type']);
};
