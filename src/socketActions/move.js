import socket from "../lib/socket.js";
import { EVENTS } from "../lib/constants.js";

/**
 * Sends the player's move to the server.
 * @param {*} move - The move made by the player.
 */
export default function sendMove(move) {
  socket.emit(EVENTS.PLAYER_MOVE, move);
}
