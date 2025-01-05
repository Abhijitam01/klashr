import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Flex, Image, Typography } from 'antd';
const { Text, Title } = Typography;
export const Header = ({ title = 'klashr', description }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Flex, { justify: "center", children: _jsx(Image, { height: 100, width: 100, preview: false, src: "https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/GdViVG-klashr-bZdj" }) }), _jsxs(Flex, { vertical: true, align: "center", children: [_jsx(Title, { level: 3, style: { margin: 0 }, children: title }), description && _jsx(Text, { type: "secondary", children: description })] })] }));
};
