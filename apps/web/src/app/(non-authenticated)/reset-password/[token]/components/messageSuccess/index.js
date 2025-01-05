import { jsx as _jsx } from "react/jsx-runtime";
import { Alert } from 'antd';
export const MessageSuccess = () => {
    return _jsx(Alert, { type: "success", message: "Your password has been changed." });
};
