import express from "express";
import next from "next";
import http from "http";
import { Server } from "socket.io";

import handlePlayerMove from "./server/handlers/playerMoveHandler.js";
import handleNewRound from "./server/handlers/newRoundHandler.js";
import handleDisconnect from "./server/handlers/disconnectHandler.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("player_move", (move) => handlePlayerMove(socket, io, move));
    socket.on("new_round", () => handleNewRound(io));
    socket.on("disconnect", () => handleDisconnect(socket, io));
  });

  expressApp.use((req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
