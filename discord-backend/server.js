import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import * as socketServer from './socketServer.js';

// Routes
import { router as authRoutes } from './routes/authRoutes.js';
import { router as friendInvitaionRoutes } from './routes/friendInvitaionRoutes.js';

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/friend-invitaion', friendInvitaionRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
