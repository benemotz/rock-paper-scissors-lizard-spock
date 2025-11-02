import gameState from "../gameState.js";

/**
 * Handles a player's disconnection from the game.
 * @param {*} socket - The socket of the disconnected player.
 * @param {*} io - The socket.io instance.
 */
export default function handleDisconnect(socket, io) {
  delete gameState.players[socket.id];
  delete gameState.moves[socket.id];
  io.emit("player_left", { players: Object.keys(gameState.players) });
}
