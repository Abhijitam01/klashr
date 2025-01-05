import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useConfiguration } from "../../core/configuration";
import { useMessageReceived, useMessageSend } from './hooks/useMessage';
const useMichelangelo = () => {
    const configuration = useConfiguration();
    useMessageSend(configuration.isMarblismMichelangeloActive);
    useMessageReceived(configuration.isMarblismMichelangeloActive);
    return _jsx(_Fragment, {});
};
export const MichelangeloProvider = ({ children }) => {
    useMichelangelo();
    return _jsx(_Fragment, { children: children });
};
