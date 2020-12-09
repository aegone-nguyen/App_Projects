import React, { useState } from 'react';

function Join(props) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOutContainer">
            <div className="joinInContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="" className="joinInput" type="text" onChange={ } /></div>
                <div><input placeholder="" className="joinInput" type="text" onChange={ } /></div>
            </div>
        </div>
    );
}

export default Join;