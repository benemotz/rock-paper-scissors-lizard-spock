import socket from "../lib/socket.js";

/**
 * Sends the player's move to the server.
 * @param {*} move - The move made by the player.
 */
export default function sendMove(move) {
  socket.emit("player_move", move);
}
