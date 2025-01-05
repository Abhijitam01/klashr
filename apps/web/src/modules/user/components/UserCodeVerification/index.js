'use client';
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Api } from "../../../../domain";
import { AuthorizationType } from "../../../../domain/authorization";
import { UserManager } from "../../../../domain/user";
import { useAuthentication } from "../../../authentication";
import { AuthorizationCodeVerification } from "../../../authorization/components";
export const UserCodeVerification = ({ children }) => {
    const authentication = useAuthentication();
    const user = authentication.user;
    const handleComplete = () => {
        window.location.reload();
    };
    const handleCancel = async () => {
        await Api.Authentication.logout(document);
        authentication.logout();
    };
    const isVerified = UserManager.isVerified(user);
    if (isVerified) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx(_Fragment, { children: _jsx(AuthorizationCodeVerification, { title: "Verify your email", user: user, type: AuthorizationType.USER_VERIFICATION, onComplete: handleComplete, onCancel: handleCancel }) }));
};
