const rules = {
  Rock: {
    oppositions: ["Scissors", "Lizard"],
    ruleTexts: {
      Scissors: "Rock crushes Scissors",
      Lizard: "Rock crushes Lizard",
    },
  },
  Paper: {
    oppositions: ["Rock", "Spock"],
    ruleTexts: { Rock: "Paper covers Rock", Spock: "Paper covers Spock" },
  },
  Scissors: {
    oppositions: ["Paper", "Lizard"],
    ruleTexts: {
      Paper: "Scissors cuts Paper",
      Lizard: "Scissors cuts Lizard",
    },
  },
  Lizard: {
    oppositions: ["Spock", "Paper"],
    ruleTexts: { Spock: "Lizard beats Spock", Paper: "Lizard beats Paper" },
  },
  Spock: {
    oppositions: ["Scissors", "Rock"],
    ruleTexts: { Scissors: "Spock beats Scissors", Rock: "Spock beats Rock" },
  },
};

/**
 * Determines the outcome of a round between two players.
 * @param {*} p1 - The move made by player 1.
 * @param {*} p2 - The move made by player 2.
 * @returns The result of the round.
 */

export default function getOutcome(p1, p2) {
  if (p1 === p2) return { result: "Draw", rule: "It's a tie!" };
  if (rules[p1].oppositions.includes(p2)) {
    return { result: "Win", rule: rules[p1].ruleTexts[p2] };
  } else {
    return { result: "Lose", rule: rules[p2].ruleTexts[p1] };
  }
}
