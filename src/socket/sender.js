import { io } from './index';

export const dispatchJoinGameEvent = (username, gamename) => {
  console.log(`[GameSocket] emit JOIN_GAME]`);
  console.log(`[GameSocket] user: ${username} gamename: ${gamename}`);
  io.emit('JOIN_GAME', {username, gamename});
}

