import gameState from "../gameState.js";
import { EVENTS } from "../../src/lib/constants.js";

/**
 * Handles the start of a new round.
 * @param {*} io - The socket.io instance.
 */
export default function handleNewRound(io) {
  gameState.moves = {};
  io.emit(EVENTS.NEW_ROUND);
}
