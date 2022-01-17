import { Socket } from "socket.io";

const MESSAGE = "D";

type LobbyUserLocation = {
    position: { x: number; y: number };
    direction: { x: number; y: number };
};

export default class LobbyUser {
    private _socket: Socket;
    public get id() {
        if (this._socket == null) {
            return null;
        }

        return this._socket.id;
    }

    private _users: LobbyUser[];

    public _location: LobbyUserLocation;
    public get location() {
        return this._location;
    }

    public constructor(socket: Socket, users: LobbyUser[]) {
        this._socket = socket;
        this._users = users;

        console.log(this.id, "users", this._users.length);

        this._initMessage();
    }

    private _initMessage() {
        this._socket.on(MESSAGE, (json) => this._onMessage(json));
    }

    private _onMessage(data: any) {
        const json = JSON.parse(data);

        const { command, param } = json;

        this._onCommand(command, param);
    }

    private _onCommand(command: string, param: any) {
        const data = { command, param };

        console.log("command", command, param);

        switch (command) {
            case "join":
                this._onJoin(param);
                break;

            case "move":
                this._onMove(param);
                break;
        }
    }

    private _broadcast(command: string, param: any) {
        const from = this._socket.id;
        const date = new Date().getTime();

        const data = {
            command,
            param,
            from,
            date,
        };

        var json = JSON.stringify(data);

        console.log("broadcast :", json);

        this._socket.broadcast.emit(MESSAGE, json);
    }

    private _send(command: string, param: any) {
        const date = new Date().getTime();

        const data = {
            command,
            param,
            date,
        };

        const json = JSON.stringify(data);

        this._socket.emit(MESSAGE, json);

        console.log("send", json);
    }

    private _onJoin(param: any) {
        this._location = this._makeLocation(param);

        this._broadcast("join", param);

        const users: any[] = [];

        this._users.forEach((user) => {
            const id = user.id;
            const { position, direction } = user.location ?? {
                position: null,
                direction: null,
            };

            if (this.id === id) {
                return;
            }

            users.push({ id, position, direction });
        });

        this._send("user_list", users);
    }

    private _onMove(param: any) {
        const location = this._makeLocation(param);

        this._broadcast("move", location);
    }

    private _makeLocation(param: any) {
        const position = {
            x: param.position.x,
            y: param.position.y,
        };

        const direction = {
            x: param.direction.x,
            y: param.direction.y,
        };

        const location: LobbyUserLocation = {
            position,
            direction,
        };

        return location;
    }
}
