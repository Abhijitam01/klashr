import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Breadcrumb, Flex, Layout } from 'antd';
import { useBreadcrumb } from './useBreadcrumb';
const { Header } = Layout;
export const SubNavigation = ({ items }) => {
    const { items: itemsBreadcrumb } = useBreadcrumb({ items });
    return (_jsx(_Fragment, { children: _jsx(Header, { style: { width: '100%', height: '26px' }, children: _jsx(Flex, { align: "center", children: _jsx(Breadcrumb, { items: itemsBreadcrumb }) }) }) }));
};
