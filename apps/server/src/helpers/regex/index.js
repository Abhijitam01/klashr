export var Regex;
(function (Regex) {
    function findMatches(content, regexExp) {
        const matches = content.match(regexExp) ?? [];
        return matches;
    }
    Regex.findMatches = findMatches;
    /**
     * Returns all captured group of each regex matches.
     */
    function findCaptures(content, regexExp) {
        const captures = [];
        const matches = findMatches(content, regexExp);
        for (const match of matches) {
            const regexExpCopy = new RegExp(regexExp);
            const groups = regexExpCopy.exec(match).slice(1);
            captures.push(groups);
        }
        return captures;
    }
    Regex.findCaptures = findCaptures;
})(Regex || (Regex = {}));
