'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RouterObject } from "../../../core/router";
import { AuthenticationHook } from "../../../domain/authentication";
import { Button, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { ErrorAlert } from './components/ErrorAlert';
import { ResetPasswordForm } from './components/Form';
import { MessageSuccess } from './components/MessageSuccess';
const { Text } = Typography;
export default function ResetPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const { isLoading, isSuccess, sendEmail, errors } = AuthenticationHook.useSendResetPassword();
    useEffect(() => {
        if (isSuccess) {
            onSuccess();
        }
    }, [isSuccess]);
    const handleSubmit = (email) => {
        sendEmail(email);
        setEmail(email);
    };
    const onSuccess = async () => { };
    return (_jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: _jsxs(Flex, { vertical: true, style: { width: '340px', paddingBottom: '100px', paddingTop: '100px' }, gap: "middle", children: [_jsx(Header, { description: "You will receive a verification code" }), _jsx(ErrorAlert, { errors: errors }), isSuccess && _jsx(MessageSuccess, { email: email }), !isSuccess && (_jsx(ResetPasswordForm, { isLoading: isLoading, onSubmit: handleSubmit })), _jsxs(Flex, { justify: "center", align: "center", children: [_jsx(Button, { ghost: true, style: { border: 'none' }, onClick: () => router.push(RouterObject.route.LOGIN), children: _jsx(Flex, { gap: 'small', justify: "center", children: _jsx(Text, { children: "Sign in" }) }) }), _jsx(Text, { type: "secondary", children: "or" }), _jsx(Button, { ghost: true, style: { border: 'none' }, onClick: () => router.push(RouterObject.route.REGISTER), children: _jsx(Flex, { gap: 'small', justify: "center", children: _jsx(Text, { children: "Sign up" }) }) })] })] }) }));
}
