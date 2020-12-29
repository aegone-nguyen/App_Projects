import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.js';

let socket;

function Chat(props) {
    const {location} = props;

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000';

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT)
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, () => {

        })
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message', (message) => {
            setMessage([...messages, message])
        })
    },[messages])

    //function for sending message

    return (
        <div>
            <h1>Chat</h1>
        </div>
    );
}

export default Chat;