import { Namespace, Server, Socket } from "socket.io";
import LobbyUser from "./LobbyUser";

const CONNECT = "connection";
const DISCONNECT = "disconnect";
const MESSAGE = "D";

export default class Lobby {
    public static readonly NAMESPACE = "/lobby";

    private _users: LobbyUser[] = [];

    private _server: Server;
    private _space: Namespace;
    public constructor(server: Server) {
        this._server = server;

        this._space = this._server.of(Lobby.NAMESPACE);
        this._space.on(CONNECT, (socket) => this._connectUser(socket));
    }

    private _connectUser(socket: Socket) {
        var user = new LobbyUser(socket, this._users);

        socket.on(DISCONNECT, (reason) => this._onLeave(user, reason));

        this._users.push(user);

        console.log("+users :", this._users.length, user.id);
    }

    private _onLeave(user: LobbyUser, reason: string) {
        var index = this._users.indexOf(user);
        if (index == -1) {
            return;
        }

        this._users.splice(index, 1);

        this._space.emit(
            MESSAGE,
            JSON.stringify({
                command: "leave",
                param: {
                    id: user.id,
                },
            })
        );

        console.log("-users :", this._users.length, reason, user.id);
    }
}
