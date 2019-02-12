import * as React from 'react';
import openSocket from 'socket.io-client';
import { requireAuth } from '../HOC/requireAuth';
const _Chatik: React.SFC<{}> = (props) => {
    const socket = openSocket('http://localhost:1337/');
    socket.on('chat', (message: string) => {
        console.log(message,new Date());
    })
    return (<h1> Chatik </h1>);
}
export const Chatik = requireAuth(_Chatik);