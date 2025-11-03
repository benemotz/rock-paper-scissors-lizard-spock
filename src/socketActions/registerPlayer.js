import socket from "../lib/socket.js";

/**
 * Sends a request to register a player to the server.
 */
export default function registerPlayer(playerId) {
  socket.emit("register_player", { playerId });
}
