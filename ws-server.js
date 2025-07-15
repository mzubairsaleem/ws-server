// dialer-ws-server.js
import { WebSocketServer } from 'ws';
import fs from 'fs';

const wss = new WebSocketServer({ port: 9099 });

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    try {
      const { filename } = JSON.parse(message.toString());
      if (!fs.existsSync(filename)) {
        ws.send(JSON.stringify({ error: 'File not found' }));
        return;
      }

      const buffer = fs.readFileSync(filename);
      ws.send(buffer, { binary: true });
    } catch (err) {
      ws.send(JSON.stringify({ error: err.message }));
    }
  });
});

console.log('📡 Dialer WS server listening on ws://0.0.0.0:9099');