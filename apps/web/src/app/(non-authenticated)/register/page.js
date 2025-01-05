'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RouterObject } from "../../../core/router";
import { useCoreStore } from "../../../core/store";
import { Api } from "../../../domain";
import { AuthenticationHook } from "../../../domain/authentication";
import { useAuthentication } from "../../../modules/authentication";
import { GlobalService } from "../../../modules/global";
import { GoogleOauth } from "../../../modules/googleOauth";
import { GoogleButton } from "../../../modules/googleOauth/components/googleButton";
import { Button, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { ErrorAlert } from './components/ErrorAlert';
import { RegisterForm } from './components/RegisterForm';
const { Text } = Typography;
export default function RegisterPage() {
    const router = useRouter();
    const store = useCoreStore();
    const { enqueueSnackbar } = useSnackbar();
    const authentication = useAuthentication();
    const { register, isLoading: isLoadingLogin, isSuccess: isSuccessLogin, errors: errorsLogin, } = AuthenticationHook.useRegister();
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
        enqueueSnackbar('Could not register with Google', { variant: 'error' });
    };
    const onSuccess = async () => {
        try {
            const user = await Api.User.findMe();
            authentication.login(user);
            await GlobalService.initialiseStore({ store });
            router.push(RouterObject.route.HOME);
        }
        catch (error) {
            enqueueSnackbar('Something went wrong with the initialization', {
                variant: 'error',
            });
        }
    };
    /* -------------------------------- HANDLERS -------------------------------- */
    const handleSubmit = (values) => {
        register(values);
    };
    const handleGoogleSuccess = (response) => {
        googleCallback(response);
    };
    return (_jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: _jsxs(Flex, { vertical: true, style: { width: '340px', paddingBottom: '100px', paddingTop: '100px' }, gap: "middle", children: [_jsx(Header, { description: "Welcome!" }), _jsx(ErrorAlert, { errors: errors }), _jsx(RegisterForm, { isLoading: isLoading, onSubmit: handleSubmit }), GoogleOauth.useActive() && (_jsx(GoogleButton, { onSuccess: handleGoogleSuccess, onError: onError })), _jsx(Button, { ghost: true, style: { border: 'none' }, onClick: () => router.push(RouterObject.route.LOGIN), children: _jsxs(Flex, { gap: 'small', justify: "center", children: [_jsx(Text, { type: "secondary", children: "Have an account?" }), " ", _jsx(Text, { children: "Sign in" })] }) })] }) }));
}
