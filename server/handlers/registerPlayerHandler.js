import gameState from "../gameState.js";
import emitCurrentPlayers from "./currentPlayerHandler.js";
/**
 * Handles a player's disconnection from the game.
 * @param {*} socket - The socket of the disconnected player.
 * @param {*} io - The socket.io instance.
 * @param {*} playerId - The unique identifier of the player.
 */
export default function handleRegisterPlayer(socket, io, playerId) {
  if (!gameState.connectionCount[playerId]) {
    gameState.connectionCount[playerId] = 0;
  }
  gameState.connectionCount[playerId] += 1;

  gameState.players[playerId] = socket.id;
  gameState.socketToPlayerId[socket.id] = playerId;

  emitCurrentPlayers(io);
}

