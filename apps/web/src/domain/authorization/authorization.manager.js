export var AuthorizationManager;
(function (AuthorizationManager) {
    function isErrorCodeIncorrect(code, status) {
        return status === 403 && code === 1;
    }
    AuthorizationManager.isErrorCodeIncorrect = isErrorCodeIncorrect;
    function isErrorCodeExpired(code, status) {
        return status === 403 && code === 2;
    }
    AuthorizationManager.isErrorCodeExpired = isErrorCodeExpired;
    function isAdmin(role) {
        return role.name === 'admin';
    }
    AuthorizationManager.isAdmin = isAdmin;
})(AuthorizationManager || (AuthorizationManager = {}));
