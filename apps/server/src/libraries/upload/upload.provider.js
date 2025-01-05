import { DateHelper } from "../../helpers/date";
export class UploadProvider {
    initialise() {
        return;
    }
    ensureFilename(filenameBefore) {
        const filenameClean = filenameBefore.replace(/[^\w\.]/gi, '');
        const timestamp = DateHelper.getNow().getTime();
        return `${timestamp}-${filenameClean}`;
    }
}
