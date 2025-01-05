export var ConfigurationObject;
(function (ConfigurationObject) {
    let Environment;
    (function (Environment) {
        Environment["DEVELOPMENT"] = "DEVELOPMENT";
        Environment["PRODUCTION"] = "PRODUCTION";
    })(Environment = ConfigurationObject.Environment || (ConfigurationObject.Environment = {}));
    let Key;
    (function (Key) {
        Key["API_BASE_URL"] = "API_BASE_URL";
        Key["NODE_ENV"] = "NODE_ENV";
    })(Key = ConfigurationObject.Key || (ConfigurationObject.Key = {}));
})(ConfigurationObject || (ConfigurationObject = {}));
