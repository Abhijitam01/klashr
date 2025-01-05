import 'reflect-metadata';
import { AccessControlRoleDecorator } from './decorators/accessControl.role.decorator';
export var AccessControl;
(function (AccessControl) {
    AccessControl.Roles = AccessControlRoleDecorator.set;
    AccessControl.getRoles = AccessControlRoleDecorator.get;
})(AccessControl || (AccessControl = {}));
