import {Exception} from "../../dto/Exception";

export default class Web3NetworkCommunicationException extends Exception {
    constructor(message: string, public readonly sourceError?: object) {
        super(message + (sourceError ? `${sourceError.message}` : ''));
    }
}