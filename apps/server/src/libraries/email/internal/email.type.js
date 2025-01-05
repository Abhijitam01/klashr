export var EmailType;
(function (EmailType) {
    EmailType["DEFAULT"] = "default";
    EmailType["AUTHENTICATION_WELCOME"] = "authentication.welcome.password";
    EmailType["AUTHENTICATION_FORGOT_PASSWORD"] = "authentication.forgot.password";
    EmailType["AUTHORIZATION_VERIFICATION_CODE"] = "authorization.verification.code";
})(EmailType || (EmailType = {}));
export const EmailSender = {
    default: {
        email: 'no-reply@marblism.com',
        name: 'Marblism',
    },
};
