import Express from "express";
import { Server } from "socket.io";
import Lobby from "./room/Lobby";

const PORT = 8080;

const app = Express();
const server = app.listen(PORT, () => {
    console.log("server is on   ", PORT);
});

const CONNECT = "connection";
const DISCONNECT = "disconnect";

const io = new Server(server, {});
io.on(CONNECT, (socket) => {
    console.log("connected", socket.id);

    socket.on(DISCONNECT, () => {
        console.log("disconnected", socket.id);
    });
});

class ServerType {
    public static readonly LOBBY = "lobby";
    public static readonly SPACE = "space";
}

class MessageType {
    public static readonly MESSAGE = "D";
}

const lobby = new Lobby(io);

const space = io.of(ServerType.SPACE).on(CONNECT, (socket) => {
    console.log("space", socket.id, "connected.");
    socket.on(MessageType.MESSAGE, (data) => {});

    socket.on(DISCONNECT, (reason) => {
        console.log("space", socket.id, "disconnected :", reason);
    });

    socket.on(MessageType.MESSAGE, (json) => {
        console.log("message", json);
    });
});

app.get("/", ($req, $res) => {
    console.log($req.originalUrl);
    $res.json({
        say: "Hi~!!!!!",
    });
});
