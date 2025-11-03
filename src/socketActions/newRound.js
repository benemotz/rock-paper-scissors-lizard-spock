import socket from "../lib/socket.js";
import { EVENTS } from "../lib/constants.js";

/**
 * Sends a request to start a new round to the server.
 */
export default function startNewRound() {
  socket.emit(EVENTS.NEW_ROUND);
}
