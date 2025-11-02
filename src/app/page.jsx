"use client";
import { useEffect, useState } from "react";
import socket from "../lib/socket.js";
import { fetchers } from "../helpers/fetchers.js";

export default function Home() {
  const [result, setResult] = useState(null);
  const [rule, setRule] = useState("");
  const [playerState, setPlayerState] = useState("select_move");

  useEffect(() => {
    socket.on("round_result", (data) => {
      setResult(data.results[socket.id]);
      setRule(data.ruleTexts[socket.id]);
      setPlayerState("show_result");
    });

    socket.on("new_round", () => {
      setResult(null);
      setRule("");
      setPlayerState("select_move");
    });

    return () => {
      socket.off("round_result");
      socket.off("new_round");
    };
  }, []);

  return (
    <div>
      <h2>Rock Paper Scissors Lizard Spock</h2>
      {playerState === "select_move" &&
        ["Rock", "Paper", "Scissors", "Lizard", "Spock"].map((move) => (
          <button
            key={move}
            onClick={() => {
              fetchers.sendMove(move);
              setPlayerState("waiting_for_opponent");
            }}
          >
            {move}
          </button>
        ))}
      {playerState === "waiting_for_opponent" && (
        <p>Waiting for other player...</p>
      )}
      {playerState === "show_result" && (
        <>
          <h3>{result}</h3>
          <p>{rule}</p>
          <button onClick={fetchers.startNewRound}>New Round</button>
        </>
      )}
    </div>
  );
}
