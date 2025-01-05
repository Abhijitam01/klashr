import { AuthenticationHook } from "../../../domain/authentication";
import { useAuthentication } from "../../../modules/authentication";
import { useEffect } from 'react';
export const useLogin = () => {
    const { login, errors } = AuthenticationHook.useLogin();
    const { isLoggedIn } = useAuthentication();
    useEffect(() => {
        if (!isLoggedIn) {
            login({ email: 'test@test.com', password: 'password' });
        }
    }, []);
    const isReady = isLoggedIn || errors.length > 0;
    return {
        isReady,
    };
};
