"use client";
import { useEffect, useMemo, useState } from "react";
import socket from "../lib/socket.js";
import { socketActions } from "../socketActions/socketActions.js";
import Image from "next/image.js";
import "./styles/page.css";
import { EVENTS, STATES } from "../lib/constants.js";

export default function Home() {
  const [result, setResult] = useState(null);
  const [rule, setRule] = useState("");
  const [playerState, setPlayerState] = useState(STATES.WAITING_FOR_CONNECTION);

  const playerId = useMemo(() => {
    if (typeof window === "undefined") return null;
    let id = localStorage.getItem("playerId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("playerId", id);
    }
    return id;
  }, []);

  const getWaitingToConnectState = (data) => {
    if (data.players.length === 1) {
      return setPlayerState(STATES.WAITING_FOR_CONNECTION);
    }
    return setPlayerState(STATES.SELECT_MOVE);
  };

  useEffect(() => {
    socketActions.registerPlayer(playerId);

    socket.on(EVENTS.ROUND_RESULT, (data) => {
      setResult(data.results[playerId]);
      setRule(data.ruleTexts[playerId]);
      setPlayerState(STATES.SHOW_RESULT);
    });

    socket.on(EVENTS.NEW_ROUND, () => {
      setResult(null);
      setRule("");
      setPlayerState(STATES.SELECT_MOVE);
    });

    socket.on(EVENTS.CURRENT_PLAYERS, (data) => {
      getWaitingToConnectState(data);
    });

    socket.on(EVENTS.PLAYER_DISCONNECTED, () => {
      setPlayerState(EVENTS.PLAYER_DISCONNECTED);
    });

    return () => {
      socket.off(EVENTS.ROUND_RESULT);
      socket.off(EVENTS.NEW_ROUND);
      socket.off(EVENTS.CURRENT_PLAYERS);
      socket.off(EVENTS.PLAYER_DISCONNECTED);
      socketActions.disconnectPlayer();
    };
  }, [playerId]);

  return (
    <div className="container">
      <h2>Rock Paper Scissors Lizard Spock</h2>
      <div className="button-wrapper">
        {playerState === STATES.SELECT_MOVE &&
          ["Rock", "Paper", "Scissors", "Lizard", "Spock"].map((move) => (
            <button
              className="choice-button"
              key={move}
              onClick={() => {
                socketActions.sendMove(move);
                setPlayerState(STATES.WAITING_FOR_OPPONENT);
              }}
            >
              <Image
                src={`/icons/${move}.png`}
                alt={move}
                className="move-icon"
                width={50}
                height={50}
              />
            </button>
          ))}
      </div>

      {playerState === EVENTS.PLAYER_DISCONNECTED && (
        <p>`Player ${socket.id} disconnected...`</p>
      )}

      {playerState === STATES.WAITING_FOR_CONNECTION && (
        <p>Waiting for another player to connect...</p>
      )}
      {playerState === STATES.WAITING_FOR_OPPONENT && (
        <p>Waiting for other player...</p>
      )}
      {playerState === STATES.SHOW_RESULT && (
        <>
          <h3>{result}</h3>
          <p>{rule}</p>
          <button onClick={socketActions.startNewRound}>New Round</button>
        </>
      )}
    </div>
  );
}
