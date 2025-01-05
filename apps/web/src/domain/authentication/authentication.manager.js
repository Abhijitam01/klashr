export var AuthenticationManager;
(function (AuthenticationManager) {
    function isErrorLoggedOut(code, status) {
        return status === 401 && code === 0;
    }
    AuthenticationManager.isErrorLoggedOut = isErrorLoggedOut;
})(AuthenticationManager || (AuthenticationManager = {}));
