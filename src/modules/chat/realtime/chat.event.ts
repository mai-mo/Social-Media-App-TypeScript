import { IAuthSocket } from "../../../common/types/express.types";
import { SocketValidation } from "../../../middleware";
import { chatservice, Chatservice } from "../chat.service";
import * as validators from '../chat.validation'


export class ChatEvent {
    private chatService: Chatservice
    constructor() { 
        this.chatService = chatservice
    }

    sayHi = (socket: IAuthSocket) => {
        return socket.on('sayHi', async (data:{name:string}) => {
            try {
                await SocketValidation<{name:string}>(validators.sayHi, data)
                console.log({ data });
                const result = this.chatService.sayHi()
                socket.emit('sayHi', result)
            } catch (error) {
                socket.emit('custem_error', error)
            }
        })
    }
}
export const chatEvent = new ChatEvent()