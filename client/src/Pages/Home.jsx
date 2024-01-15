import React, { useEffect, useState } from 'react'
import { useSocket } from '../Providers/Socket';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { socket } = useSocket()
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [roomId, setRoomId] = useState()
    
    useEffect(() => {
        socket.on("joined-user", ({ roomId }) => {
            console.log("joined-user in room ", roomId);
            navigate(`/room/${roomId}`)
        });
      // return () => socket.disconnect();
    },[socket])

    const handleRoom = () => {
        socket.emit("join-room", {roomId: roomId, emailId: email });
    }
  return (
    <div className="homepage-container">
      <div>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" placeholder="Enter Room Code" value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>
              <button onClick={handleRoom}>Enter Room</button>
      </div>
    </div>
  );
}

export default Home
