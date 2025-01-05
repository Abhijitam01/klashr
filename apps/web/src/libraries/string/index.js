export var StringLibrary;
(function (StringLibrary) {
    function stringify(value = {}) {
        return JSON.stringify(value, null, 2);
    }
    StringLibrary.stringify = stringify;
    function capitalise(content) {
        if (!content) {
            return '';
        }
        return content.charAt(0).toUpperCase() + content.slice(1);
    }
    StringLibrary.capitalise = capitalise;
    function toCamelCase(content) {
        const REGEX_UPPERCASE = /^[A-Z]+$/g;
        const isAllUpperCase = REGEX_UPPERCASE.test(content);
        if (isAllUpperCase) {
            return content.toLowerCase();
        }
        return content
            .toLowerCase()
            .replace(/_([a-zA-Z0-9])/g, (_, match) => match.toUpperCase());
    }
    StringLibrary.toCamelCase = toCamelCase;
    function toCapitalisedCamelCase(content) {
        const contentCamelCase = toCamelCase(content);
        const contentCapitalised = capitalise(contentCamelCase);
        return contentCapitalised;
    }
    StringLibrary.toCapitalisedCamelCase = toCapitalisedCamelCase;
    function isDefined(value) {
        return typeof value === 'string' && value.trim() !== '';
    }
    StringLibrary.isDefined = isDefined;
})(StringLibrary || (StringLibrary = {}));
