import { userInfo } from 'node:os';

export const username = () => {
  const user = userInfo();
  console.log(`Current system user name: ${user.username}`);
};
