'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { RouterObject } from "../../../../core/router";
import { AuthenticationHook } from "../../../../domain/authentication";
import { Button, Flex, Typography } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { ErrorAlert } from './components/ErrorAlert';
import { FormToken } from './components/form';
import { MessageSuccess } from './components/messageSuccess';
const { Text } = Typography;
export default function ResetPasswordTokenPage() {
    const { token } = useParams();
    const router = useRouter();
    const { isLoading, isSuccess, reset, errors } = AuthenticationHook.useResetPassword();
    useEffect(() => {
        if (isSuccess) {
            onSuccess();
        }
    }, [isSuccess]);
    const handleSubmit = (password) => {
        reset(token, password);
    };
    const onSuccess = async () => { };
    return (_jsx(_Fragment, { children: _jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: _jsxs(Flex, { vertical: true, style: {
                    width: '340px',
                    paddingBottom: '100px',
                    paddingTop: '100px',
                }, gap: "middle", children: [_jsx(Header, { description: "Change your password" }), _jsx(ErrorAlert, { errors: errors }), isSuccess && _jsx(MessageSuccess, {}), !isSuccess && (_jsx(FormToken, { isLoading: isLoading, onSubmit: handleSubmit })), _jsxs(Flex, { justify: "center", align: "center", children: [_jsx(Button, { ghost: true, style: { border: 'none' }, onClick: () => router.push(RouterObject.route.LOGIN), children: _jsx(Flex, { gap: 'small', justify: "center", children: _jsx(Text, { children: "Sign in" }) }) }), _jsx(Text, { type: "secondary", children: "or" }), _jsx(Button, { ghost: true, style: { border: 'none' }, onClick: () => router.push(RouterObject.route.REGISTER), children: _jsx(Flex, { gap: 'small', justify: "center", children: _jsx(Text, { children: "Sign up" }) }) })] })] }) }) }));
}
