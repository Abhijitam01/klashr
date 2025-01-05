export var ConfigurationServiceObject;
(function (ConfigurationServiceObject) {
    let Key;
    (function (Key) {
        Key["PORT"] = "PORT";
        Key["ENVIRONMENT"] = "NODE_ENV";
        Key["CLIENT_BASE_URL"] = "SERVER_CLIENT_BASE_URL";
        Key["BASE_URL"] = "SERVER_BASE_URL";
        Key["AUTHENTICATION_TOKEN_METHOD"] = "SERVER_AUTHENTICATION_TOKEN_METHOD";
        Key["SERVER_CLIENT_BASE_URL_APP_SLUG"] = "SERVER_CLIENT_BASE_URL_APP_SLUG";
    })(Key = ConfigurationServiceObject.Key || (ConfigurationServiceObject.Key = {}));
    let Environment;
    (function (Environment) {
        Environment["DEVELOPMENT"] = "development";
        Environment["PRODUCTION"] = "production";
    })(Environment = ConfigurationServiceObject.Environment || (ConfigurationServiceObject.Environment = {}));
    let AuthenticationTokenMethod;
    (function (AuthenticationTokenMethod) {
        AuthenticationTokenMethod["COOKIES"] = "cookies";
        AuthenticationTokenMethod["HEADER"] = "header";
    })(AuthenticationTokenMethod = ConfigurationServiceObject.AuthenticationTokenMethod || (ConfigurationServiceObject.AuthenticationTokenMethod = {}));
})(ConfigurationServiceObject || (ConfigurationServiceObject = {}));
