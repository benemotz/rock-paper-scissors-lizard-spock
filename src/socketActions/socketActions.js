import sendMove  from "./move.js";
import startNewRound from "./newRound.js";
import disconnectPlayer from "./disconnect.js";
import registerPlayer from "./registerPlayer.js";

export const socketActions = {
  sendMove,
  startNewRound,
  disconnectPlayer,
  registerPlayer,
};
