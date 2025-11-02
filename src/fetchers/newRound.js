import socket from "../lib/socket.js";
/**
 * Sends a request to start a new round to the server.
 */
export default function startNewRound() {
  socket.emit("new_round");
}
