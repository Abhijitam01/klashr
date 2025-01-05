import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert } from 'antd';
export const ErrorAlert = ({ errors }) => {
    return (_jsx(_Fragment, { children: errors.length > 0 && (_jsx(Alert, { message: errors.map((error, errorIndex) => `${error}\n`), type: "error" })) }));
};
