import { jsx as _jsx } from "react/jsx-runtime";
import { Alert } from 'antd';
export const MessageSuccess = ({ email }) => {
    return (_jsx(Alert, { style: { textAlign: 'center' }, message: `We sent an email to ${email} with a link to reset your password`, type: "success" }));
};
