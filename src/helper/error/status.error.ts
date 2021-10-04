import { HttpStatus } from "@nestjs/common";
import { BaseError } from "./base.error";

class ControllerError extends BaseError {
    constructor(message: string, errorCode: string, statusCode: number) {
        super()
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}

export const CONTROLLER_ERROR = {
    ID_NOTFOUND_ERROR: new ControllerError('COULD_FOUND_THIS_ID', 'JOB_0201', HttpStatus.BAD_REQUEST),
    INVALID_INPUT_PARAMS: new ControllerError('INPUT_PARAMS_INVALID', 'JOB_0202', HttpStatus.NO_CONTENT),
    UNABLE_CREATE_USER: new ControllerError('SERVER_UNABLE_TO_CREATE_USER', 'JOB_0203', HttpStatus.BAD_REQUEST),
    INVALID_EMAIL_OR_PASSWORD_ERROR: new ControllerError('EMAIL_OR_PASSWORD_ERROR', 'JOB_0204', HttpStatus.BAD_REQUEST)
}