import { setExitEvents } from './events/exit.js';
import { setInputEvent } from './events/input.js';
import { setStartingDir } from './directory.js';
import { getUsernameFromArgs, greetUser } from './user.js';

const init = async () => {
  const username = getUsernameFromArgs();

  setStartingDir();
  setExitEvents(username);
  greetUser(username);
  setInputEvent();
};

init();
