import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Flex, Result } from 'antd';
export const StepSuccess = ({ onContinue }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Result, { status: "success", title: "Verification completed", style: { padding: 0 } }), _jsx(Flex, { justify: "center", children: _jsx(Button, { type: "primary", onClick: onContinue, children: "Continue" }) })] }));
};
