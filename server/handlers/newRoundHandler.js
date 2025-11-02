import gameState from "../gameState.js";
/**
 * Handles the start of a new round.
 * @param {*} io - The socket.io instance.
 */
export default function handleNewRound(io) {
  gameState.moves = {};
  io.emit("new_round");
}

