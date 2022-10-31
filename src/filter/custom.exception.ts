import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN);
    }
}

export class BadRequestException extends HttpException {
    constructor() {
        super('Bad Request', HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundException extends HttpException {
    constructor() {
        super('Not Found', HttpStatus.NOT_FOUND);
    }
}
