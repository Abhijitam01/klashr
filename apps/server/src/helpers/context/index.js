export var ContextHelper;
(function (ContextHelper) {
    function toRequest(context) {
        return context.switchToHttp().getRequest();
    }
    ContextHelper.toRequest = toRequest;
})(ContextHelper || (ContextHelper = {}));
