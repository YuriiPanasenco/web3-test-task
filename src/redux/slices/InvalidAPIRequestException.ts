import {Exception} from "../../model/Exception";

export default class InvalidAPIRequestException extends Exception {
    public readonly type = "InvalidAPIRequestException";
}