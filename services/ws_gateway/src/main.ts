import http from 'node:http';
import { Server } from 'socket.io';

const PORT = Number(process.env.PORT) || 4000;
const httpServer = http.createServer();
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`);
});

httpServer.listen(PORT, () => {
    console.log(`ws_gateway is running on port ${PORT}`);
});
