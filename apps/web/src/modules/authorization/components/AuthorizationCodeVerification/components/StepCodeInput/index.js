import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Flex, Form, Input } from 'antd';
export const StepCodeInput = ({ user, isLoadingSubmit, isLoadingSend, onSubmit, onClickSend, }) => {
    const [form] = Form.useForm();
    const handleSubmit = (values) => {
        onSubmit(values.code);
    };
    return (_jsx(_Fragment, { children: _jsxs(Form, { form: form, onFinish: handleSubmit, layout: "vertical", requiredMark: false, children: [_jsx(Form.Item, { name: "code", label: `Enter the code sent to ${user.email}`, rules: [{ required: true, message: 'Code is required' }], children: _jsx(Input, { placeholder: "XXXXXX" }) }), _jsxs(Flex, { justify: "space-between", children: [_jsx(Button, { type: "primary", htmlType: "submit", loading: isLoadingSubmit, children: "Verify" }), _jsx(Button, { onClick: onClickSend, loading: isLoadingSend, children: "Send Again" })] })] }) }));
};
