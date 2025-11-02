import gameState from "../gameState.js";
import getOutcome from "../rules.js";

/**
 * Handles a player's move in the game.
 * @param {*} socket - The socket of the player making the move.
 * @param {*} io - The socket.io instance.
 * @param {*} move - The move made by the player.
 */

export default function handlePlayerMove(socket, io, move) {
  gameState.players[socket.id] = true;
  gameState.moves[socket.id] = move;

  if (Object.keys(gameState.moves).length === 2) {
    const [player1, player2] = Object.keys(gameState.moves);
    const move1 = gameState.moves[player1];
    const move2 = gameState.moves[player2];

    const { result: result1, rule: ruleText1 } = getOutcome(move1, move2);
    const { result: result2, rule: ruleText2 } = getOutcome(move2, move1);

    io.emit("round_result", {
      moves: { [player1]: move1, [player2]: move2 },
      results: { [player1]: result1, [player2]: result2 },
      ruleTexts: { [player1]: ruleText1, [player2]: ruleText2 },
    });

    gameState.moves = {};
  }
}
