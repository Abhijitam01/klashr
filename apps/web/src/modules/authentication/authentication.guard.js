import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCoreStore } from "../../core/store";
import { MrbSplashScreen } from "../../designSystem";
import { Api } from "../../domain";
import { AuthenticationHook } from "../../domain/authentication";
import { UserManager } from "../../domain/user";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RouterObject } from '../../core/router';
import { GlobalService } from '../global';
import { useAuthentication } from './authentication.context';
function AuthenticationGuard({ children, type = 'authenticated', }) {
    const authentication = useAuthentication();
    const store = useCoreStore();
    const pathname = usePathname();
    const router = useRouter();
    const authenticationToken = AuthenticationHook.useToken();
    const [isLoading, setLoading] = useState(true);
    const [pathRedirected, setPathRedirected] = useState();
    const [isRedirected, setRedirected] = useState(false);
    const handleNonAuthenticated = async () => {
        if (authentication.isLoggedIn) {
            router.replace(RouterObject.route.HOME);
            setPathRedirected(RouterObject.route.HOME);
            return;
        }
        setLoading(true);
        try {
            const { token } = await Api.Authentication.refresh();
            authenticationToken.setToken(token);
            const user = await Api.User.findMe();
            await GlobalService.initialiseStore({ store });
            if (UserManager.isVisitor(user)) {
                setRedirected(true);
                setLoading(false);
                return;
            }
            authentication.login(user);
            router.replace(RouterObject.route.HOME);
            setPathRedirected(RouterObject.route.HOME);
        }
        catch (error) {
            authentication.logout();
            await GlobalService.cleanStore({ store });
            setRedirected(true);
            setLoading(false);
        }
    };
    const handleProtected = async () => {
        if (authentication.isLoggedIn) {
            setLoading(false);
            setRedirected(true);
            return;
        }
        setLoading(true);
        try {
            const { token } = await Api.Authentication.refresh();
            authenticationToken.setToken(token);
            const user = await Api.User.findMe();
            await GlobalService.initialiseStore({ store });
            if (UserManager.isVisitor(user)) {
                authentication.setUser(user);
                router.replace(RouterObject.route.LOGIN);
                setPathRedirected(RouterObject.route.LOGIN);
                return;
            }
            authentication.login(user);
            setLoading(false);
            setRedirected(true);
        }
        catch (error) {
            authentication.logout();
            await GlobalService.cleanStore({ store });
            router.replace(RouterObject.route.LOGIN);
            setPathRedirected(RouterObject.route.LOGIN);
        }
    };
    const handlePublic = async () => {
        if (authentication.isLoggedIn) {
            setLoading(false);
            setRedirected(true);
            return;
        }
        setLoading(true);
        try {
            const { token } = await Api.Authentication.registerVisitor();
            authenticationToken.setToken(token);
            const user = await Api.User.findMe();
            await GlobalService.initialiseStore({ store });
            if (UserManager.isVisitor(user)) {
                authentication.setUser(user);
            }
            else {
                authentication.login(user);
            }
        }
        catch (error) {
            authentication.logout();
            await GlobalService.cleanStore({ store });
        }
        setLoading(false);
        setRedirected(true);
    };
    useEffect(() => {
        if (type === 'non-authenticated') {
            handleNonAuthenticated();
        }
        else if (type === 'authenticated') {
            handleProtected();
        }
        else if (type === 'public') {
            handlePublic();
        }
    }, [type, authentication.isLoggedIn]);
    useEffect(() => {
        if (!isLoading) {
            const isReady = pathname === pathRedirected;
            if (isReady) {
                setRedirected(true);
            }
        }
    }, [isLoading, pathname]);
    return (_jsx(_Fragment, { children: isLoading || !isRedirected ? (_jsx(MrbSplashScreen, { name: "klashr" })) : (children) }));
}
export { AuthenticationGuard };
