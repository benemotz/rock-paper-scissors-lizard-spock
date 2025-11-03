
import gameState from "../gameState.js";

/**
 * Emits the current list of players to all connected clients.
 * @param {*} io - The socket.io instance.
 */
export default function emitCurrentPlayers(io) {
  io.emit("current_players", { players: Object.keys(gameState.players) });
}
