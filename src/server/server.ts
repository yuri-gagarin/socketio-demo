// .env variables //
import dotenv from "dotenv";
dotenv.config();
// express and server imports ///
import express, { Router } from "express";
import HTTP from "http";
import { combineRoutes } from "../routes/combineRoutes.js";
import { initMessagingSocketIO } from "../sockets/mesagingSocket.js";
// types //
// Express App and Router //
const app = express();
const router = Router();

// set up routes //
app.use(combineRoutes(router));

export const PORT: number = Number(process.env.PORT) || 8000;

export const server: HTTP.Server = HTTP.createServer(app);

// socketio //
initMessagingSocketIO(server);

