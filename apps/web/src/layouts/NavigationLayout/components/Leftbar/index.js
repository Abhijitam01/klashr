import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { usePathname } from 'next/navigation';
export const Leftbar = ({ logo, items, itemsUser }) => {
    const pathname = usePathname();
    return (_jsx(_Fragment, { children: _jsxs(Sider, { width: 250, trigger: null, style: { height: '100%' }, children: [logo, _jsx(Menu, { mode: "inline", items: items, selectedKeys: [pathname], style: { width: '100%' } }), itemsUser?.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Divider, { style: { marginTop: 5, marginBottom: 5 } }), _jsx(Menu, { mode: "inline", items: itemsUser, selectedKeys: [pathname], style: { width: '100%' } })] }))] }) }));
};
