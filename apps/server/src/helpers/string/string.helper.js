import { Regex } from '../regex';
export var StringHelper;
(function (StringHelper) {
    function toSnakeCase(content) {
        return content.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
    StringHelper.toSnakeCase = toSnakeCase;
    function toCamelCase(content) {
        const REGEX_PREFIX = /^(_{0,2})/g;
        const REGEX_SUFFIX = /(_{0,2})$/g;
        const prefix = Regex.findMatches(content, /^(_{0,2})/g)[0] ?? '';
        const suffix = Regex.findMatches(content, /(_{0,2})$/g)[0] ?? '';
        const contentClean = content
            .replace(REGEX_PREFIX, '')
            .replace(REGEX_SUFFIX, '');
        const contentCamelCase = contentClean.replace(/_([a-zA-Z0-9])/g, (_, match) => match.toUpperCase());
        return `${prefix}${contentCamelCase}${suffix}`;
    }
    StringHelper.toCamelCase = toCamelCase;
})(StringHelper || (StringHelper = {}));
