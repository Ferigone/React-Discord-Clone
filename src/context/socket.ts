import { io } from 'socket.io-client';
import React from 'react';

const SOCKET_URL: string = process.env.REACT_APP_WS_URL || 'http://localhost:3333/ws';

export const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    upgrade: false,
    autoConnect: false,
});

export const SocketContext = React.createContext(socket);