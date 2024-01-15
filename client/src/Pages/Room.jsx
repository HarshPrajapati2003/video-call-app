import React, { useEffect } from 'react'
import { useSocket } from '../Providers/Socket';
import { usePeer } from '../Providers/Peer';

function Room() {
    const { socket } = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAns } = usePeer();

    const handleNewUserJoined = async (data) => {
        const { emailId } = data;
        console.log("New user joined room with email:", emailId);
        const offer = await createOffer()
        socket.emit("call-user", { emailId, offer })
    };

    const handleIncommingCall =async ({from,offer}) => {
        console.log("incomming call from : ", from, offer)
        const ans = await createAnswer(offer)
        socket.emit("call-accepted",{emailId:from , ans})
    }

    const handleCallAccepted =async (data) => {
        const { ans } = data
        console.log("Call Got Accepted",ans)
        await setRemoteAns(ans)
    }

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
        socket.on("incomming-call", handleIncommingCall)
        socket.on("call-accepted",handleCallAccepted)
        
        // return () => socket.disconnect();
    }, [socket, createOffer]);
  return (
    <div>
      <h1>Room Page</h1>
    </div>
  )
}

export default Room
