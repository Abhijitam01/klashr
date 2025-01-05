import { jsx as _jsx } from "react/jsx-runtime";
import { theme } from 'antd';
const { useToken } = theme;
export const MrbHtml = ({ children }) => {
    const { token } = useToken();
    return (_jsx("html", { lang: "en", style: { background: token.colorBgBase, color: token.colorTextBase }, children: _jsx("body", { children: children }) }));
};
