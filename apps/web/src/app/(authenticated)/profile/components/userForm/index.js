import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Input } from 'antd';
export const UserForm = ({ user, isLoading, isDisabled, onSubmit, }) => {
    const [form] = Form.useForm();
    const handleSubmit = (values) => {
        onSubmit(values);
    };
    const initialValues = {
        name: user?.name,
        email: user?.email,
        pictureUrl: user?.pictureUrl,
    };
    return (_jsxs(Form, { form: form, initialValues: initialValues, onFinish: handleSubmit, layout: "vertical", requiredMark: false, children: [_jsx(Form.Item, { name: "name", label: "Name", rules: [{ required: true, message: 'Name is required' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: 'Email is required' }], children: _jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" }) }), _jsx(Form.Item, { label: "Profile picture", name: "pictureUrl", children: _jsx(Input, {}) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, disabled: isDisabled, children: "Save" }) })] }));
};
