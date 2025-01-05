import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { GoogleLogin } from '@react-oauth/google';
export const GoogleButton = ({ onSuccess, onError }) => {
    return (_jsx(_Fragment, { children: _jsx(GoogleLogin, { width: "340", text: "continue_with", theme: "outline", onSuccess: onSuccess, onError: onError }) }));
};
