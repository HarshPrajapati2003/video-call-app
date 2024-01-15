const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const cors = require("cors")

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

app.use(cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 8000;

const emailToSocketMapping = new Map()

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    
    socket.on("join-room", (data) => {
        const { roomId, emailId } = data
        console.log("User : ",emailId, " joined room : ",roomId)
        emailToSocketMapping.set(emailId,socket.id)
        socket.join(roomId)
        socket.emit("joined-user",{roomId})
        socket.broadcast.to(roomId).emit("user-joined",{emailId})
    })

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

app.use(express.static( path.resolve('./public') ));

server.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
