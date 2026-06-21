
export class ApplicationException extends Error {

    constructor(override message: string, public statusCode: number, override cause?: unknown) {
        // super(message, {cause})  
        super()
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
    }

}
