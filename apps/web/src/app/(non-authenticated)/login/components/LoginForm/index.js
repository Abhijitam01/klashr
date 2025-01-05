'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useConfiguration } from "../../../../../core/configuration";
import { Button, Flex, Form, Input } from 'antd';
export const LoginForm = ({ isLoading, onSubmit, onResetPassword }) => {
    const [form] = Form.useForm();
    const { isEnvironmentDevelopment } = useConfiguration();
    const handleSubmit = (values) => {
        onSubmit(values);
    };
    const initialValues = { email: null, password: null };
    if (isEnvironmentDevelopment) {
        initialValues.email = 'test@test.com';
        initialValues.password = 'password';
    }
    return (_jsxs(Form, { form: form, onFinish: handleSubmit, layout: "vertical", initialValues: initialValues, requiredMark: false, children: [_jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: 'Email is required' }], children: _jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" }) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: 'Password is required' }], children: _jsx(Input.Password, { type: "password", placeholder: "Your password", autoComplete: "current-password" }) }), _jsx(Form.Item, { children: _jsx(Flex, { justify: "end", children: _jsx(Button, { type: "link", onClick: onResetPassword, style: { padding: 0, margin: 0 }, children: "Forgot password?" }) }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, block: true, children: "Sign in" }) })] }));
};
