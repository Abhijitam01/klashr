import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Input, message } from 'antd';
export const FormToken = ({ isLoading, onSubmit }) => {
    const [form] = Form.useForm();
    const handleSubmit = (values) => {
        if (values.password !== values.passwordConfirmation) {
            message.error('Password and confirmation must match.');
            return;
        }
        onSubmit(values.password);
    };
    return (_jsxs(Form, { form: form, onFinish: handleSubmit, layout: "vertical", requiredMark: false, children: [_jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: 'Password is required' }], children: _jsx(Input.Password, { type: "password", placeholder: "Your new password", autoComplete: "current-password" }) }), _jsx(Form.Item, { label: "Password confirmation", name: "passwordConfirmation", rules: [
                    { required: true, message: 'Password confirmation is required' },
                ], children: _jsx(Input.Password, { type: "password", placeholder: "Password confirmation", autoComplete: "current-password" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, block: true, children: "Reset Password" }) })] }));
};
