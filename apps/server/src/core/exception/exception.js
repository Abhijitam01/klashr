import { HttpException } from '@nestjs/common';
export class Exception extends HttpException {
    constructor(options) {
        super({ ...options, type: 'CORE_EXCEPTION' }, options.status);
    }
}
