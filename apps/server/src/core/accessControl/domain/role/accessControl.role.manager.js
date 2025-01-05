export var AccessControlRoleManager;
(function (AccessControlRoleManager) {
    function isStatusFound(status) {
        return status === 'found';
    }
    AccessControlRoleManager.isStatusFound = isStatusFound;
    function isStatusNotFound(status) {
        return status === 'not-found';
    }
    AccessControlRoleManager.isStatusNotFound = isStatusNotFound;
    function isStatusUnknown(status) {
        return status === 'unknown';
    }
    AccessControlRoleManager.isStatusUnknown = isStatusUnknown;
})(AccessControlRoleManager || (AccessControlRoleManager = {}));
