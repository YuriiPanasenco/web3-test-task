export class Exception {
    public readonly type = "Exception";
    public message: string;

    constructor(message) {
        this.message = message;
    }
}