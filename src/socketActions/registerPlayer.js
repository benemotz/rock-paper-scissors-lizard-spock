import socket from "../lib/socket.js";
import { EVENTS } from "../lib/constants.js";

/**
 * Sends a request to register a player to the server.
 */
export default function registerPlayer(playerId) {
  socket.emit(EVENTS.REGISTER_PLAYER, { playerId });
}
