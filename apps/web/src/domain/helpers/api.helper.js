export var ApiHelper;
(function (ApiHelper) {
    function buildQueryOptions(options) {
        if (options) {
            const encodedOptions = encodeURIComponent(JSON.stringify(options));
            return `?queryOptions=${encodedOptions}`;
        }
        else {
            return ``;
        }
    }
    ApiHelper.buildQueryOptions = buildQueryOptions;
})(ApiHelper || (ApiHelper = {}));
