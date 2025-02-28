import http from 'node:http';
import { WebSocketServer } from 'ws';

const PORT = Number(process.env.PORT) || 4000;
const httpServer = http.createServer();
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (socket) => {
    console.log(`New connection from ${socket}`);
});

httpServer.listen(PORT, () => {
    console.log(`ws_gateway is running on port ${PORT}`);
});
