import socket from "../lib/socket.js";
/**
 * Disconnects the player from the server.
 */
export default function disconnectPlayer() {
  socket.disconnect();
  localStorage.clear();
}
