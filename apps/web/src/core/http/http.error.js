export class HttpError extends Error {
    status;
    data;
    constructor(status, data) {
        super(data.message ?? 'An HTTP error occured');
        this.name = 'HTTPError';
        this.data = data;
        this.status = status;
    }
    static getCode(error) {
        if (error instanceof HttpError) {
            return error.data.code;
        }
        return -1;
    }
    static getStatus(error) {
        if (error instanceof HttpError) {
            return error.status;
        }
        return -1;
    }
    static getValidationMessages(error) {
        const messages = (error?.['data']?.['data'] ?? []);
        return messages;
    }
}
