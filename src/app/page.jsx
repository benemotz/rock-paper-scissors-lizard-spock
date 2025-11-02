
"use client";
import { useEffect, useState } from "react";
import socket from "../lib/socket.js";
import { fetchers } from "../helpers/fetchers.js";

export default function Home() {
  const [result, setResult] = useState(null);
  const [rule, setRule] = useState("");

  useEffect(() => {
    socket.on("round_result", (data) => {
      setResult(data.results[socket.id]);
      setRule(data.ruleTexts[socket.id]);
    });
    socket.on("new_round", () => {
      setResult(null);
      setRule("");
    });
    return () => {
      socket.off("round_result");
      socket.off("new_round");
    };
  }, []);

  return (
    <div>
      <h1>Rock Paper Scissors Lizard Spock</h1>
      {result ? (
        <>
          <h2>{result}</h2>
          <p>{rule}</p>
          <button onClick={fetchers.startNewRound}>New Round</button>
        </>
      ) : (
        ["Rock", "Paper", "Scissors", "Lizard", "Spock"].map((move) => (
          <button key={move} onClick={() => fetchers.sendMove(move)}>{move}</button>
        ))
      )}
    </div>
  );
}
