export class Exception {
    public readonly type = "Exception";
    public message: string;

    constructor(message, public readonly data?) {
        this.message = message;
    }
}