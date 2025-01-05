import { jsx as _jsx } from "react/jsx-runtime";
import { Alert } from 'antd';
export const ErrorAlert = ({ errors }) => {
    return (_jsx("div", { style: { minHeight: '40px', width: '100%' }, children: errors.length > 0 && (_jsx(Alert, { type: "error", message: [...errors].map((error, errorIndex) => (_jsx("div", { children: error }, errorIndex))) })) }));
};
