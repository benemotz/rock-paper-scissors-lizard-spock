"use client";
import { useEffect, useMemo, useState } from "react";
import socket from "../lib/socket.js";
import { fetchers } from "../socketActions/socketActions.js";
import Image from "next/image.js";
import "./styles/page.css";

export default function Home() {
  const selectMoveState = "select_move";
  const newRoundState = "new_round";
  const roundResultState = "round_result";
  const currentPLayerState = "current_players";
  const waitingForConnectionState = "waiting_for_connection";
  const showResultState = "show_result";
  const waitingForOpponentState = "waiting_for_opponent";
  const playerLeftState = "player_left";

  const [result, setResult] = useState(null);
  const [rule, setRule] = useState("");
  const [playerState, setPlayerState] = useState(waitingForConnectionState);

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
      return setPlayerState(waitingForConnectionState);
    }
    return setPlayerState(selectMoveState);
  };

  useEffect(() => {
    socket.emit("register_player", { playerId });

    socket.on(roundResultState, (data) => {
      setResult(data.results[playerId]);
      setRule(data.ruleTexts[playerId]);
      setPlayerState(showResultState);
    });

    socket.on(newRoundState, () => {
      setResult(null);
      setRule("");
      setPlayerState(selectMoveState);
    });

    socket.on(currentPLayerState, (data) => {
      console.log("Current players:", data.players, data.results, data.ruleTexts);
      getWaitingToConnectState(data);
    });

    socket.on(playerLeftState, () => {
      setPlayerState(playerLeftState);
    });

    return () => {
      socket.off(roundResultState);
      socket.off(newRoundState);
      socket.off(currentPLayerState);
      socket.off(playerLeftState);
      socket.disconnect();
    };
  }, [playerId]);

  return (
    <div className="container">
      <h2>Rock Paper Scissors Lizard Spock</h2>
      <div className="button-wrapper">
        {playerState === selectMoveState &&
          ["Rock", "Paper", "Scissors", "Lizard", "Spock"].map((move) => (
            <button
              className="choice-button"
              key={move}
              onClick={() => {
                fetchers.sendMove(move);
                setPlayerState(waitingForOpponentState);
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

      {playerState === playerLeftState && (
        <p>`Player ${socket.id} disconnected...`</p>
      )}

      {playerState === waitingForConnectionState && (
        <p>Waiting for another player to connect...</p>
      )}
      {playerState === waitingForOpponentState && (
        <p>Waiting for other player...</p>
      )}
      {playerState === showResultState && (
        <>
          <h3>{result}</h3>
          <p>{rule}</p>
          <button onClick={fetchers.startNewRound}>New Round</button>
        </>
      )}
    </div>
  );
}
