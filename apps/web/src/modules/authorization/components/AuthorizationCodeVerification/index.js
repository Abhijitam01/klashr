import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AuthorizationHook } from "../../../../domain/authorization";
import { Button, Flex, Modal, Typography } from 'antd';
import { ErrorAlert } from './components/ErrorAlert';
import { StepCodeInput } from './components/StepCodeInput';
import { StepSend } from './components/StepSend';
import { StepSuccess } from './components/StepSuccess';
export const AuthorizationCodeVerification = ({ title, type, user, onComplete, onCancel, }) => {
    const { isSent, isVerified, send, verify, isLoadingSend, isLoadingVerify, errors, } = AuthorizationHook.useCode({ type, user });
    const handleSend = () => {
        send();
    };
    const handleCodeSubmit = (keyPrivate) => {
        verify(keyPrivate);
    };
    const handleClickContinue = () => {
        onComplete();
    };
    const isStepSend = !isSent && !isVerified;
    const isStepInput = isSent && !isVerified;
    const isStepSuccess = isSent && isVerified;
    const hasErrors = errors.length > 0;
    return (_jsx(_Fragment, { children: _jsx(Modal, { open: true, onCancel: onCancel, closeIcon: false, footer: [], children: _jsxs(Flex, { vertical: true, gap: "large", style: { height: '300px' }, children: [_jsxs(Flex, { vertical: true, gap: "large", flex: 1, children: [_jsx(Typography.Title, { style: { textAlign: 'center' }, children: title }), isStepSend && (_jsx(StepSend, { user: user, isLoading: isLoadingSend, onClick: handleSend })), isStepInput && (_jsx(StepCodeInput, { user: user, isLoadingSend: isLoadingSend, isLoadingSubmit: isLoadingVerify, onSubmit: handleCodeSubmit, onClickSend: handleSend }))] }), isStepSuccess && _jsx(StepSuccess, { onContinue: handleClickContinue }), hasErrors && _jsx(ErrorAlert, { messages: errors }), !isStepSuccess && (_jsx(Flex, { justify: "center", children: _jsx(Button, { onClick: onCancel, children: "Cancel" }, "cancel") }))] }) }) }));
};
