import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';

export const ls = async () => {
  const files = await fs.readdir(cwd());
  const arr = [];

  // TODO add file sorting
  for (const file of files) {
    const fileStat = await fs.lstat(path.join(cwd(), file));
    const isFile = fileStat.isFile();
    const fileType = isFile ? 'file' : 'directory';

    arr.push({ Name: file, Type: fileType });
  }

  console.table(arr, ['Name', 'Type']);
};
