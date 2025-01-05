'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { RouterObject } from "../../../core/router";
import { useCoreStore } from "../../../core/store";
import { AuthenticationHook } from "../../../domain/authentication";
import { useAuthentication } from "../../../modules/authentication";
import { GoogleOauth } from "../../../modules/googleOauth";
import { GoogleButton } from "../../../modules/googleOauth/components/googleButton";
import { Button, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { ErrorAlert } from './components/ErrorAlert';
import { LoginForm } from './components/LoginForm';
const { Text } = Typography;
export default function LoginPage() {
    const router = useRouter();
    const store = useCoreStore();
    const { enqueueSnackbar } = useSnackbar();
    const authentication = useAuthentication();
    const { login, isLoading: isLoadingLogin, isSuccess: isSuccessLogin, errors: errorsLogin, } = AuthenticationHook.useLogin();
    const { googleCallback, isLoading: isLoadingGoogle, isSuccess: isSuccessGoogle, errors: errorsGoogle, } = AuthenticationHook.useGoogle();
    const isSuccess = isSuccessLogin || isSuccessGoogle;
    const isLoading = isLoadingLogin || isLoadingGoogle || isSuccess;
    const errors = [...errorsLogin, ...errorsGoogle];
    useEffect(() => {
        if (isSuccess) {
            onSuccess();
        }
    }, [isSuccess]);
    const onError = () => {
        enqueueSnackbar('Could not login with Google', { variant: 'error' });
    };
    const onSuccess = async () => {
        try {
            router.push(RouterObject.route.HOME);
        }
        catch (error) {
            enqueueSnackbar('Something went wrong during the initialization', {
                variant: 'error',
            });
        }
    };
    /* -------------------------------- HANDLERS -------------------------------- */
    const handleSubmit = (values) => {
        login(values);
    };
    const handleGoogleSuccess = (response) => {
        googleCallback(response);
    };
    return (_jsx(_Fragment, { children: _jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: _jsxs(Flex, { vertical: true, style: {
                    width: '340px',
                    paddingBottom: '100px',
                    paddingTop: '100px',
                }, gap: "middle", children: [_jsx(Header, { description: "Welcome back!" }), _jsx(ErrorAlert, { errors: errors }), _jsx(LoginForm, { isLoading: isLoading, onSubmit: handleSubmit, onResetPassword: () => router.push(RouterObject.route.RESET_PASSWORD) }), GoogleOauth.useActive() && (_jsx(GoogleButton, { onSuccess: handleGoogleSuccess, onError: onError })), _jsx(Button, { ghost: true, style: { border: 'none' }, onClick: () => router.push(RouterObject.route.REGISTER), children: _jsxs(Flex, { gap: 'small', justify: "center", children: [_jsx(Text, { type: "secondary", children: "No account?" }), " ", _jsx(Text, { children: "Sign up" })] }) })] }) }) }));
}
