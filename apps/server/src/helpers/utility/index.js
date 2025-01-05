import { v4 as uuidv4 } from 'uuid';
export var Utility;
(function (Utility) {
    function sleep(milliseconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }
    Utility.sleep = sleep;
    function getUUID() {
        return uuidv4();
    }
    Utility.getUUID = getUUID;
    function buildRandomAlphanumericString(length) {
        const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
            result += alphanumericCharacters.charAt(randomIndex);
        }
        return result;
    }
    Utility.buildRandomAlphanumericString = buildRandomAlphanumericString;
    function isDefined(value) {
        const isEmptyString = typeof value === 'string' && value === '';
        return value !== null && value !== undefined && !isEmptyString;
    }
    Utility.isDefined = isDefined;
    function isNull(value) {
        return !isDefined(value);
    }
    Utility.isNull = isNull;
    function arrayUnique(items) {
        const uniqueSet = new Set(items);
        return Array.from(uniqueSet);
    }
    Utility.arrayUnique = arrayUnique;
    function removeTrailingSlash(content) {
        const REGEX_SLASH = /\/$/g;
        return content.replace(REGEX_SLASH, '');
    }
    Utility.removeTrailingSlash = removeTrailingSlash;
    function isEmpty(value) {
        if (!isDefined(value)) {
            return true;
        }
        const isArray = Array.isArray(value);
        if (isArray) {
            return value.length === 0;
        }
        const isString = typeof value === 'string';
        if (isString) {
            return value.trim() !== '';
        }
        return false;
    }
    Utility.isEmpty = isEmpty;
})(Utility || (Utility = {}));
