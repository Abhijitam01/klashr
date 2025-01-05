import { useConfiguration } from "../../../core/configuration";
import { HttpError } from "../../../core/http";
import { Api } from "../..";
import { Utility } from "../../../libraries/utility";
import { useState } from 'react';
import { AuthorizationManager } from '../authorization.manager';
export const useCode = ({ type, user }) => {
    const [isSent, setSent] = useState(false);
    const [isVerified, setVerified] = useState(false);
    const [isLoadingSend, setLoadingSend] = useState(false);
    const [isLoadingVerify, setLoadingVerify] = useState(false);
    const [keyPublic, setKeyPublic] = useState();
    const [errors, setErrors] = useState([]);
    const { isEnvironmentDevelopment, localEmailServerUrl } = useConfiguration();
    const send = async () => {
        setLoadingSend(true);
        try {
            const { keyPublic } = await Api.Authorization.sendCode(type, user.email);
            setErrors([]);
            setKeyPublic(keyPublic);
            setSent(true);
            if (isEnvironmentDevelopment) {
                Utility.openInNewTab(window, localEmailServerUrl);
            }
        }
        catch (error) {
            setErrors(['Something went wrong. Try again later.']);
        }
        setLoadingSend(false);
    };
    const verify = async (keyPrivate) => {
        setLoadingVerify(true);
        try {
            await Api.Authorization.verifyCode(type, user.email, {
                keyPrivate,
                keyPublic,
            });
            setErrors([]);
            setKeyPublic(keyPublic);
            setVerified(true);
        }
        catch (error) {
            const code = HttpError.getCode(error);
            const status = HttpError.getStatus(error);
            const isExpired = AuthorizationManager.isErrorCodeExpired(code, status);
            const isIncorrect = AuthorizationManager.isErrorCodeIncorrect(code, status);
            if (isExpired) {
                setErrors(['Code has expired. Try again.']);
            }
            else if (isIncorrect) {
                setErrors(['Code is incorrect.']);
            }
            else {
                setErrors(['Something went wrong. Try again later.']);
            }
        }
        setLoadingVerify(false);
    };
    return {
        isSent,
        isVerified,
        send,
        verify,
        isLoadingSend,
        isLoadingVerify,
        errors,
    };
};
