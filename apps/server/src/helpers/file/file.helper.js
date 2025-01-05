import * as fs from 'fs';
import * as os from 'os';
import * as Path from 'path';
import { join } from 'path';
import { Readable } from 'typeorm/platform/PlatformTools';
export var FileHelper;
(function (FileHelper) {
    function getRoot() {
        return Path.join(__dirname, '../../..');
    }
    FileHelper.getRoot = getRoot;
    function findFileContent(path) {
        return fs.readFileSync(path, 'utf-8');
    }
    FileHelper.findFileContent = findFileContent;
    function writeFolder(path) {
        fs.mkdirSync(path, { recursive: true });
    }
    FileHelper.writeFolder = writeFolder;
    function writeFile(path, content) {
        const pathFolder = path.split('/').slice(0, -1).join('/');
        writeFolder(pathFolder);
        return fs.writeFileSync(path, content);
    }
    FileHelper.writeFile = writeFile;
    function joinPaths(...paths) {
        return join(...paths);
    }
    FileHelper.joinPaths = joinPaths;
    function createReadStream(path) {
        return fs.createReadStream(path);
    }
    FileHelper.createReadStream = createReadStream;
    function buildTemporaryPath(path) {
        const pathTemporary = Path.join(os.tmpdir(), 'marblism-tmp', path);
        return pathTemporary;
    }
    FileHelper.buildTemporaryPath = buildTemporaryPath;
    function fromArrayBufferToReadable(arrayBuffer) {
        let buffer = Buffer.from(arrayBuffer);
        const readableStream = new Readable({
            read() {
                this.push(buffer); // Push the buffer to the stream
                this.push(null); // Indicate the end of the stream
            },
        });
        return readableStream;
    }
    FileHelper.fromArrayBufferToReadable = fromArrayBufferToReadable;
    async function createReadStreamFromArrayBuffer(arrayBuffer, filename) {
        const path = buildTemporaryPath(filename);
        const pathFolder = path.split('/').slice(0, -1).join('/');
        deleteFolder(pathFolder);
        writeFolder(pathFolder);
        fs.writeFileSync(path, Buffer.from(arrayBuffer));
        return fs.createReadStream(path);
    }
    FileHelper.createReadStreamFromArrayBuffer = createReadStreamFromArrayBuffer;
    async function deleteFile(path) {
        fs.unlinkSync(path);
    }
    FileHelper.deleteFile = deleteFile;
    function deleteFolder(path) {
        try {
            fs.rmdirSync(path, { recursive: true });
        }
        catch (error) {
            // ignore
        }
    }
    FileHelper.deleteFolder = deleteFolder;
})(FileHelper || (FileHelper = {}));
