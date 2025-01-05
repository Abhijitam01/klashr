import { HttpService } from '../../core/http';
/**
 * @provider UploadApi
 * @example example.txt
 * @description An Upload library to upload one file
 * @function {(file: File) => Promise<string>} upload - Upload the File to the server and return the url of the uploaded file so you can then store it
 * @usage `Api.Upload.upload(file);`
 * @isImportOverriden false
 * @import import { Api } from '@web/domain'
 */
export class UploadApi {
    static async upload(file) {
        const formData = new FormData();
        formData.append('file', file);
        return HttpService.api
            .upload(`/v1/upload/public`, formData)
            .then(({ url }) => url);
    }
    /**
     * Upload a file and returns a private url.
     */
    static async uploadPrivate(file) {
        const formData = new FormData();
        formData.append('file', file);
        return HttpService.api
            .upload(`/v1/upload/private`, formData)
            .then(({ url }) => url);
    }
    /**
     * Convert a private url to a public one, valid for one hour.
     */
    static async fromPrivateToPublicUrl(url) {
        return HttpService.api
            .post(`/v1/upload/private-to-public`, { url })
            .then(({ url }) => url);
    }
}
