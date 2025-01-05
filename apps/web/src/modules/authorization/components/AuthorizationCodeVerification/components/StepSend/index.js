import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button, Flex, Spin, Typography } from 'antd';
export const StepSend = ({ user, isLoading, onClick }) => {
    return (_jsxs(Flex, { align: "center", vertical: true, gap: "large", children: [_jsxs(Typography, { children: ["A verification code will be sent to ", user.email] }), _jsx(Button, { type: "primary", onClick: onClick, disabled: isLoading, children: isLoading ? _jsx(Spin, {}) : 'Send' })] }));
};
