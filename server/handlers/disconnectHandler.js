import gameState from "../gameState.js";

/**
 * Handles a player's disconnection from the game.
 * @param {*} socket - The socket of the disconnected player.
 * @param {*} io - The socket.io instance.
 */
export default function handleDisconnectPlayer(socket, io) {
  const playerId = gameState.socketToPlayerId[socket.id];
  if (!playerId) return;

  gameState.connectionCount[playerId] -= 1;

  if (gameState.connectionCount[playerId] <= 0) {
    delete gameState.players[playerId];
    delete gameState.moves[playerId];
    delete gameState.connectionCount[playerId];
    delete gameState.socketToPlayerId[socket.id];
    io.emit("player_disconnected", { players: Object.keys(gameState.players) });
  }

}
