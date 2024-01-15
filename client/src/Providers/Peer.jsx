import React, { createContext, useContext, useMemo } from "react";  

const PeerContext = createContext(null)

export const usePeer = () => {
    return useContext(PeerContext);
}

export const PeerProvider = ({ children }) => {
    const peer = useMemo(
      () =>
        new RTCPeerConnection({
          iceServers: [
            // {
            //   urls: [
            //     "stun1.l.google.com:19302",
            //     "stun:global.stun.twilio.com:3478",
            //   ],
            // },
            {
              url: "turn:numb.viagenie.ca",
              credential: "muazkh",
              username: "webrtc@live.com",
            },
            {
              url: "turn:turn.bistri.com:80",
              credential: "homeo",
              username: "homeo",
            },
          ],
        }),
      []
    );

    const createOffer = async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        return answer
    }

    const setRemoteAns = async (ans) => {
        await peer.setRemoteDescription(ans)
    }

    return (
      <PeerContext.Provider
        value={{ peer, createOffer, createAnswer, setRemoteAns }}
      >
        {children}
      </PeerContext.Provider>
    );
}
