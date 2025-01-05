export var AuthenticationApplicationEvent;
(function (AuthenticationApplicationEvent) {
    let UserPasswordResetRequested;
    (function (UserPasswordResetRequested) {
        UserPasswordResetRequested.key = 'authentication.application.user-password-reset-requested';
    })(UserPasswordResetRequested = AuthenticationApplicationEvent.UserPasswordResetRequested || (AuthenticationApplicationEvent.UserPasswordResetRequested = {}));
    let UserRegistered;
    (function (UserRegistered) {
        UserRegistered.key = 'authentication.application.user-registered';
    })(UserRegistered = AuthenticationApplicationEvent.UserRegistered || (AuthenticationApplicationEvent.UserRegistered = {}));
})(AuthenticationApplicationEvent || (AuthenticationApplicationEvent = {}));
