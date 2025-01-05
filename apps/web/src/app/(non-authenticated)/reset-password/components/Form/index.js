import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Input } from 'antd';
export const ResetPasswordForm = ({ isLoading, onSubmit }) => {
    const [form] = Form.useForm();
    const handleSubmit = (values) => {
        onSubmit(values.email);
    };
    return (_jsxs(Form, { form: form, onFinish: handleSubmit, layout: "vertical", requiredMark: false, children: [_jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: 'Email is required' }], children: _jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, block: true, children: "Reset Password" }) })] }));
};
