import gameState from "../gameState.js";
import { EVENTS } from "../../src/lib/constants.js";

/**
 * Emits the current list of players to all connected clients.
 * @param {*} io - The socket.io instance.
 */
export default function emitCurrentPlayers(io) {
  io.emit(EVENTS.CURRENT_PLAYERS, { players: Object.keys(gameState.players) });
}
