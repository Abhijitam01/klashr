import { Snackbar } from "../../../designSystem";
import { HttpError } from '../http.error';
export class HttpClient {
    baseUrl;
    middlewaresOnSuccess = [];
    middlewaresOnError = [];
    accessToken;
    constructor(options) {
        this.baseUrl = options?.baseUrl;
    }
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }
    setAccessToken(token) {
        this.accessToken = token;
    }
    getRequestOptions() {
        const options = {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        if (this.accessToken) {
            options.headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        return options;
    }
    getRequestUploadOptions() {
        const options = {
            credentials: 'include',
            headers: {},
        };
        if (this.accessToken) {
            options.headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        return options;
    }
    async get(url) {
        const requestOptions = {
            ...this.getRequestOptions(),
            method: 'GET',
        };
        return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
            return this.handleResponse(response);
        });
    }
    async post(url, data = {}) {
        const requestOptions = {
            ...this.getRequestOptions(),
            method: 'POST',
            body: JSON.stringify(data),
        };
        return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
            return this.handleResponse(response);
        });
    }
    async upload(url, data) {
        const requestOptions = {
            ...this.getRequestUploadOptions(),
            method: 'POST',
            body: data,
        };
        return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
            return this.handleResponse(response);
        });
    }
    async patch(url, data = {}) {
        const requestOptions = {
            ...this.getRequestOptions(),
            method: 'PATCH',
            body: JSON.stringify(data),
        };
        return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
            return this.handleResponse(response);
        });
    }
    async delete(url) {
        const requestOptions = {
            ...this.getRequestOptions(),
            method: 'DELETE',
        };
        return fetch(`${this.baseUrl}${url}`, requestOptions).then(response => {
            return this.handleResponse(response);
        });
    }
    /* -------------------------------------------------------------------------- */
    /*                                  UTILITIES                                 */
    /* -------------------------------------------------------------------------- */
    addMiddlewareOnSuccess(...middlewares) {
        this.middlewaresOnSuccess.push(...middlewares);
    }
    addMiddlewareOnError(...middlewares) {
        this.middlewaresOnError.push(...middlewares);
    }
    async handleResponse(response) {
        const data = await response.json();
        if (response.ok) {
            await this.runMiddlewares(response, this.middlewaresOnSuccess);
            return data;
        }
        else {
            const error = new HttpError(response.status, data);
            this.handleError(data);
            await this.runMiddlewares(response, this.middlewaresOnError, error);
            throw error;
        }
    }
    async handleError(errorData) {
        const { data } = errorData;
        if (Array.isArray(data)) {
            const details = data.join('\n');
            Snackbar.Instance.enqueueSnackbar(details, {
                variant: 'error',
            });
        }
    }
    async runMiddlewares(response, middlewares, error) {
        for (const middleware of middlewares) {
            try {
                await middleware(response, error);
            }
            catch (error) {
                // ignore
            }
        }
    }
}
