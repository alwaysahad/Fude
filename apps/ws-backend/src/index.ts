import { WebSocketServer } from 'ws';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  const url = request.url; // ws://localhost:8080?token=123123
  if (!url) {
    return
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  // ["ws:localhost:8080"] ["token=123123"]
  const token = queryParams.get('token') || "";
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

  if (!decoded || !(decoded as JwtPayload).userId) {
    ws.close();
    return;
  }

  ws.on('message', function message(data) {
    ws.send('pong');
  });
});