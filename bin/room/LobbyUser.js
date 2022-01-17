"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MESSAGE = "D";
class LobbyUser {
    constructor(socket, users) {
        this._socket = socket;
        this._users = users;
        console.log(this.id, "users", this._users.length);
        this._initMessage();
    }
    get id() {
        if (this._socket == null) {
            return null;
        }
        return this._socket.id;
    }
    get location() {
        return this._location;
    }
    _initMessage() {
        this._socket.on(MESSAGE, (json) => this._onMessage(json));
    }
    _onMessage(data) {
        const json = JSON.parse(data);
        const { command, param } = json;
        this._onCommand(command, param);
    }
    _onCommand(command, param) {
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
    _broadcast(command, param) {
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
    _send(command, param) {
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
    _onJoin(param) {
        this._location = this._makeLocation(param);
        this._broadcast("join", param);
        const users = [];
        this._users.forEach((user) => {
            var _a;
            const id = user.id;
            const { position, direction } = (_a = user.location) !== null && _a !== void 0 ? _a : {
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
    _onMove(param) {
        const location = this._makeLocation(param);
        this._broadcast("move", location);
    }
    _makeLocation(param) {
        const position = {
            x: param.position.x,
            y: param.position.y,
        };
        const direction = {
            x: param.direction.x,
            y: param.direction.y,
        };
        const location = {
            position,
            direction,
        };
        return location;
    }
}
exports.default = LobbyUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnlVc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Jvb20vTG9iYnlVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBT3BCLE1BQXFCLFNBQVM7SUFpQjFCLFlBQW1CLE1BQWMsRUFBRSxLQUFrQjtRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUF0QkQsSUFBVyxFQUFFO1FBQ1QsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBS0QsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFXTyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyxVQUFVLENBQUMsSUFBUztRQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlCLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRWhDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lB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