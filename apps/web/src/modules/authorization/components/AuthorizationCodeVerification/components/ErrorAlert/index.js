import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert } from 'antd';
export const ErrorAlert = ({ messages }) => {
    return (_jsx(_Fragment, { children: messages.length > 0 && (_jsx(Alert, { message: messages.map((error, errorIndex) => `${error}\n`), type: "error" })) }));
};
