"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LobbyUser_1 = __importDefault(require("./LobbyUser"));
const CONNECT = "connection";
const DISCONNECT = "disconnect";
const MESSAGE = "D";
class Lobby {
    constructor(server) {
        this._users = [];
        this._server = server;
        this._space = this._server.of(Lobby.NAMESPACE);
        this._space.on(CONNECT, (socket) => this._connectUser(socket));
    }
    _connectUser(socket) {
        var user = new LobbyUser_1.default(socket, this._users);
        socket.on(DISCONNECT, (reason) => this._onLeave(user, reason));
        this._users.push(user);
        console.log("+users :", this._users.length, user.id);
    }
    _onLeave(user, reason) {
        var index = this._users.indexOf(user);
        if (index == -1) {
            return;
        }
        this._users.splice(index, 1);
        this._space.emit(MESSAGE, JSON.stringify({
            command: "leave",
            param: {
                id: user.id,
            },
        }));
        console.log("-users :", this._users.length, reason, user.id);
    }
}
exports.default = Lobby;
Lobby.NAMESPACE = "/lobby";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm9vbS9Mb2JieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDREQUFvQztBQUVwQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUM7QUFDN0IsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDO0FBQ2hDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUVwQixNQUFxQixLQUFLO0lBT3RCLFlBQW1CLE1BQWM7UUFKekIsV0FBTSxHQUFnQixFQUFFLENBQUM7UUFLN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVPLFlBQVksQ0FBQyxNQUFjO1FBQy9CLElBQUksSUFBSSxHQUFHLElBQUksbUJBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU8sUUFBUSxDQUFDLElBQWUsRUFBRSxNQUFjO1FBQzVDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2IsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNaLE9BQU8sRUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ1gsT0FBTyxFQUFFLE9BQU87WUFDaEIsS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTthQUNkO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O0FBM0NMLHdCQTRDQztBQTNDMEIsZUFBUyxHQUFHLFFBQVEsQ0FBQyJ9