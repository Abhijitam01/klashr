import { SetMetadata } from '@nestjs/common';
export var AccessControlRoleDecorator;
(function (AccessControlRoleDecorator) {
    const KEY = 'access-control.roles';
    AccessControlRoleDecorator.set = (...names) => SetMetadata(KEY, names);
    function get(context, reflector) {
        return (reflector.getAllAndOverride(KEY, [
            context.getHandler(),
            context.getClass(),
        ]) ?? []);
    }
    AccessControlRoleDecorator.get = get;
})(AccessControlRoleDecorator || (AccessControlRoleDecorator = {}));
