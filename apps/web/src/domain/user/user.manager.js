import { Utility } from "../../libraries/utility";
import { UserStatus } from './user.model';
export var UserManager;
(function (UserManager) {
    function isVerified(user) {
        return user?.status === UserStatus.VERIFIED;
    }
    UserManager.isVerified = isVerified;
    function isVisitor(user) {
        return Utility.isNull(user?.email) && Utility.isDefined(user?.id);
    }
    UserManager.isVisitor = isVisitor;
})(UserManager || (UserManager = {}));
