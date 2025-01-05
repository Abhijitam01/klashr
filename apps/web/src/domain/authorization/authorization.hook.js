import { useCode as useCodeInternal } from './hooks/authorization.code.hook';
export var AuthorizationHook;
(function (AuthorizationHook) {
    AuthorizationHook.useCode = useCodeInternal;
})(AuthorizationHook || (AuthorizationHook = {}));
