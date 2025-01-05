import { v4 as uuidv4 } from 'uuid';
export var Utility;
(function (Utility) {
    function getUUID() {
        return uuidv4();
    }
    Utility.getUUID = getUUID;
    function sleep(milliseconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }
    Utility.sleep = sleep;
    function isNull(value) {
        return value === null || value === undefined;
    }
    Utility.isNull = isNull;
    function isDefined(value) {
        const isEmptyString = typeof value === 'string' && value === '';
        return value !== null && value !== undefined && !isEmptyString;
    }
    Utility.isDefined = isDefined;
    function openInNewTab(window, url) {
        window.open(url, '_blank');
    }
    Utility.openInNewTab = openInNewTab;
    function sortByString(items, key) {
        return items.sort((a, b) => a[key].localeCompare(b[key]));
    }
    Utility.sortByString = sortByString;
    function removeTrailingSlash(content) {
        const REGEX_SLASH = /\/$/g;
        return content.replace(REGEX_SLASH, '');
    }
    Utility.removeTrailingSlash = removeTrailingSlash;
    function stringToInitials(content) {
        if (isNull(content)) {
            return '';
        }
        const words = content.trim().split(' ');
        const isOneWord = words.length === 1;
        if (isOneWord) {
            return words[0].slice(0, 2)?.toUpperCase();
        }
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    Utility.stringToInitials = stringToInitials;
})(Utility || (Utility = {}));
