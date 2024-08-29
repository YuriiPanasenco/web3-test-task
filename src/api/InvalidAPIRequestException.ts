import {Exception} from "../dto/Exception";

export default class InvalidAPIRequestException extends Exception {
    public readonly type = "InvalidAPIRequestException";
}