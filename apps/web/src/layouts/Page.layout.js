import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Flex } from 'antd';
const getLayoutBreakpoints = (layout) => {
    const mapping = {
        'full-width': {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 24 },
            xl: { span: 24 },
            xxl: { span: 24 },
        },
        narrow: {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 16 },
            xl: { span: 14 },
            xxl: { span: 12 },
        },
        'super-narrow': {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 12 },
            xl: { span: 10 },
            xxl: { span: 8 },
        },
    };
    return mapping[layout] ?? mapping['full-width'];
};
export const PageLayout = ({ children, layout = 'full-width', isCentered = false, ...props }) => {
    const breakpoints = getLayoutBreakpoints(layout);
    return (_jsx(_Fragment, { children: _jsx(Flex, { style: { width: '100%' }, justify: "center", children: _jsxs(Col, { ...props, ...breakpoints, className: "p-2", style: { paddingBottom: '100px' }, children: [isCentered && (_jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, style: { minHeight: '100%' }, children: children })), !isCentered && children] }) }) }));
};
