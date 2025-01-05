import * as bodyParser from 'body-parser';
export var RequestHelper;
(function (RequestHelper) {
    function getPath(request) {
        return request?.path;
    }
    RequestHelper.getPath = getPath;
    function getMethod(request) {
        return request?.method;
    }
    RequestHelper.getMethod = getMethod;
    function getBody(request) {
        return request?.body;
    }
    RequestHelper.getBody = getBody;
    function getQueryOptions(request) {
        const queryOptions = request.query.queryOptions;
        if (queryOptions) {
            try {
                return JSON.parse(queryOptions);
            }
            catch (error) {
                throw new Error(error);
            }
        }
        return {};
    }
    RequestHelper.getQueryOptions = getQueryOptions;
    function getAuthorization(request) {
        const token = request?.headers?.['authorization'];
        return token?.replace('Bearer ', '')?.trim();
    }
    RequestHelper.getAuthorization = getAuthorization;
    function getRawBody(request) {
        return request?.['rawBodyBuffer'];
    }
    RequestHelper.getRawBody = getRawBody;
    function handleRawBody(request, response, next) {
        if (!request?.path?.endsWith('/raw')) {
            next();
            return;
        }
        const captureRawBodyMiddleware = bodyParser.raw({ type: () => true });
        captureRawBodyMiddleware(request, response, (error) => {
            if (error) {
                next();
                return;
            }
            request['rawBodyBuffer'] = request.body;
            next();
        });
    }
    RequestHelper.handleRawBody = handleRawBody;
})(RequestHelper || (RequestHelper = {}));
