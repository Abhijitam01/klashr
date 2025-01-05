'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MrbPasswordStrength } from "../../../../../designSystem";
import { Button, Form, Input } from 'antd';
export const RegisterForm = ({ isLoading, onSubmit }) => {
    const [form] = Form.useForm();
    const handleSubmit = (values) => {
        onSubmit(values);
    };
    const password = Form.useWatch('password', form);
    return (_jsxs(Form, { form: form, onFinish: handleSubmit, layout: "vertical", autoComplete: "off", requiredMark: false, children: [_jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: 'Email is required' }], children: _jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" }) }), _jsx(Form.Item, { name: "name", rules: [{ required: true, message: 'Name is required' }], label: "Name", children: _jsx(Input, { placeholder: "Your name" }) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: 'Password is required' }], children: _jsx(Input.Password, { type: "password", placeholder: "Your password", autoComplete: "current-password" }) }), _jsx(MrbPasswordStrength, { value: password, className: "mb-3" }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, block: true, children: "Register" }) })] }));
};
