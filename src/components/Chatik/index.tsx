import * as React from 'react';
import openSocket from 'socket.io-client';
import { requireAuth } from '../HOC/requireAuth';
import { MessageBlock } from './messageBlock';
import { socket } from '../..';
interface IProps {
    receiveMessage: (message: string) => Object;
    messages: Array<string>;
}
class _Chatik extends React.Component<IProps, {}>{

    constructor(props: IProps) {
        super(props);
        socket.on('chat', (message: string) => {
            this.props.receiveMessage(message);
        });
        socket.emit('chat','Some text');
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6 mt-2">
                    {
                        this.props.messages ? this.props.messages.map((message) => {
                            <MessageBlock message={message} />
                        }) : ""
                    }
                </div>
            </div>
        );
    }
}
export const Chatik = requireAuth(_Chatik);