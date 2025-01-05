import { SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
export var Authentication;
(function (Authentication) {
    const KEY_PUBLIC = 'authentication.public';
    const KEY_USER_NOT_VERIFIED_ALLOWED = 'authentication.user-not-verified.allowed';
    const KEY_USER_VISITOR_ALLOWED = 'authentication.user-visitor.allowed';
    Authentication.AllowUserNotVerified = (isAllowed = true) => SetMetadata(KEY_USER_NOT_VERIFIED_ALLOWED, isAllowed);
    function isUserNotVerifiedAllowed(context, reflector) {
        const DEFAULT_VALUE = false;
        return (getValue(context, reflector, KEY_USER_NOT_VERIFIED_ALLOWED) ??
            DEFAULT_VALUE);
    }
    Authentication.isUserNotVerifiedAllowed = isUserNotVerifiedAllowed;
    Authentication.Public = () => SetMetadata(KEY_PUBLIC, true);
    function isPublic(context, reflector) {
        return getValue(context, reflector, KEY_PUBLIC);
    }
    Authentication.isPublic = isPublic;
    Authentication.AllowVisitor = (isAllowed = true) => SetMetadata(KEY_USER_VISITOR_ALLOWED, isAllowed);
    function isVisitorAllowed(context, reflector) {
        const DEFAULT_VALUE = true;
        return (getValue(context, reflector, KEY_USER_VISITOR_ALLOWED) ?? DEFAULT_VALUE);
    }
    Authentication.isVisitorAllowed = isVisitorAllowed;
    function getValue(context, reflector, key) {
        return reflector.getAllAndOverride(key, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
})(Authentication || (Authentication = {}));
