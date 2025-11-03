
# RPSLS - Rock Paper Scissors Lizard Spock

## Author
**Motz, Bénédicte**

## Description
This is a real-time multiplayer game based on the extended Rock Paper Scissors Lizard Spock rules. It is built using **Next.js** (but not using the specific functionalities of nextJs) for the frontend and **Express + Socket.IO** for the backend. Players connect, select their moves, and receive instant feedback on the outcome of each round.

When testing locally on a single computer, each player should use a different browser. Multiple tabs in the same browser are treated as one player because they share the same `localStorage`.

## Features
- Real-time communication using Socket.IO
- Modular server-side handlers for connection, disconnection, moves, and rounds
- Frontend interface built with React and Next.js
- Support for multiple connections per player
- Rule-based outcome logic for RPSLS

## Setup Instructions

# install dependencies
npm install

# start backend
npm run server

# start frontend
npm run dev (remove the lock file in .next/dev/lock, this will enable to run npm run dev and npm run server together. It is needed to build the frontend)

Open app in browser and go to http://localhost:3000

## Architecture Overview

### **Client (React + Next.js)**
- **socketActions** (emits events to server):
  - `sendMove()` → emits **`player_move`**
  - `startNewRound()` → emits **`new_round`**
  - `disconnectPlayer()` → calls `socket.disconnect()`
  - `registerPlayer()` → emits **`register_player`**

- **useEffect** (listens for server events):
  - **`round_result`** → update result UI
  - **`new_round`** → reset UI
  - **`current_players`** → update player list
  - **`player_disconnected`** → show disconnect message

- **UI** renders based on `playerState`:
  - `waiting_for_connection`
  - `select_move`
  - `waiting_for_opponent`
  - `show_result`
  - `player_disconnected`

---

### **Server (Express + Socket.IO)**
- **gameState.js** → holds:
  - `players` (playerId → socketId)
  - `moves` (playerId → move)
  - `socketToPlayerId` (socketId → playerId)
  - `connectionCount` (playerId → number of connections)

- **Handlers**:
  - `handlePlayerMove(socket, io, move)`
  - `handleNewRound(io)`
  - `handleDisconnectPlayer(socket, io)`
  - `handleRegisterPlayer(socket, io, playerId)`

- **server.js**:
  - `io.on("connection")`:
    - `socket.on("player_move", ...)`
    - `socket.on("new_round", ...)`
    - `socket.on("register_player", ...)`
    - `socket.on("disconnect", ...)` *(built-in)*

- **Server emits**:
  - `round_result`
  - `new_round`
  - `current_players`
  - `player_disconnected`

---

### ✅ **Event Flow**
```text
Client emits → Server handles → Server emits → Client listens
