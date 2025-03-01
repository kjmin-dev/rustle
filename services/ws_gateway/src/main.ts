import http from 'node:http';
import { pino } from 'pino';
import { WebSocketServer } from 'ws';

const PORT = Number(process.env.PORT) || 3100;
const httpServer = http.createServer();
const wss = new WebSocketServer({ server: httpServer });
const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: process.env.NODE_ENV !== 'production',
        },
    },
});

wss.on('connection', (socket) => {
    logger.info(`New connection from ${socket}`);
});

httpServer.listen(PORT, () => {
    logger.info(`ws_gateway is running on port ${PORT}`);
});
