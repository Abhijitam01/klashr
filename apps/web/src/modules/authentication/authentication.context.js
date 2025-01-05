import { jsx as _jsx } from "react/jsx-runtime";
import { HttpError, HttpService } from "../../core/http";
import { AuthenticationHook, AuthenticationManager, } from "../../domain/authentication";
import { UserManager } from "../../domain/user";
import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';
const AuthenticationContext = createContext(undefined);
function AuthenticationProvider({ children }) {
    const { enqueueSnackbar } = useSnackbar();
    const authenticationToken = AuthenticationHook.useToken();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isHttpSetup, setHttpSetup] = useState(false);
    const [dateExpired, setDateExpired] = useState();
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        if (isHttpSetup) {
            return;
        }
        HttpService.api.setAccessToken(authenticationToken.getToken());
        HttpService.api.addMiddlewareOnError((response, error) => onErrorHttp(response, error));
        setHttpSetup(true);
    }, []);
    useEffect(() => {
        if (isLoggedIn) {
            enqueueSnackbar(`Your session has expired`);
            logout();
        }
    }, [dateExpired]);
    const login = (user) => {
        if (!isLoggedIn) {
            setLoggedIn(true);
            setAuthenticated(true);
        }
        setUser(user);
    };
    const logout = () => {
        if (isLoggedIn) {
            authenticationToken.removeToken();
            setLoggedIn(false);
            setAuthenticated(false);
        }
    };
    const setUserOrVisitor = (user) => {
        if (UserManager.isVisitor(user)) {
            setLoggedIn(false);
            setAuthenticated(false);
        }
        setUser(user);
    };
    const onErrorHttp = (response, error) => {
        const code = HttpError.getCode(error);
        const status = response.status;
        const isTokenExpired = AuthenticationManager.isErrorLoggedOut(code, status);
        if (isTokenExpired) {
            setDateExpired(new Date().getTime());
        }
    };
    return (_jsx(AuthenticationContext.Provider, { value: {
            isLoggedIn,
            isAuthenticated,
            user,
            setUser: setUserOrVisitor,
            login,
            logout,
        }, children: children }));
}
const useAuthentication = () => {
    return useContext(AuthenticationContext);
};
export { AuthenticationProvider, useAuthentication };
