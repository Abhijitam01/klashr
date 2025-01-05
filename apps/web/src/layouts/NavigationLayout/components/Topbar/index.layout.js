import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MenuOutlined } from '@ant-design/icons';
import { Flex, Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation';
import { TabAdmin } from '../TabAdmin';
import { TabNotification } from '../TabNotifications';
import { TabProfile } from '../TabProfile';
const { Header } = Layout;
export const Topbar = ({ isMobile = false, isLoggedIn = false, logo, items, itemsMobile, }) => {
    const pathname = usePathname();
    const style = {};
    const isThin = items.length === 0;
    if (isThin) {
        style.height = '60px';
    }
    if (isMobile) {
        return (_jsx(_Fragment, { children: _jsx(Header, { children: _jsxs(Flex, { align: "center", justify: "space-between", children: [_jsx(Flex, { style: { padding: `12px 0 12px 0` }, children: logo }), _jsx(Menu, { mode: "horizontal", items: itemsMobile, selectedKeys: [pathname], style: { width: 46 }, overflowedIndicator: _jsx(MenuOutlined, {}) })] }) }) }));
    }
    return (_jsx(_Fragment, { children: _jsx(Header, { style: style, children: _jsxs(Flex, { align: "center", style: style, children: [logo, _jsx(Flex, { vertical: true, flex: 1, children: _jsx(Menu, { mode: "horizontal", items: items, selectedKeys: [pathname], overflowedIndicator: _jsx(MenuOutlined, {}), style: { flex: 1 } }) }), _jsx(Flex, { align: "center", gap: "middle", children: isLoggedIn && (_jsxs(_Fragment, { children: [_jsx(TabAdmin, {}), _jsx(TabNotification, {}), _jsx(TabProfile, {})] })) })] }) }) }));
};
