import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckCircleOutlined } from '@ant-design/icons';
import { Col, Flex, Row, Typography } from 'antd';
import { usePassword } from './usePasword';
export const MrbPasswordStrength = ({ value, ...props }) => {
    const getIconName = (isOk) => {
        if (isOk) {
            return _jsx(CheckCircleOutlined, {});
        }
        else {
            return (_jsx("div", { style: {
                    height: '14px',
                    width: '14px',
                    marginTop: '4px',
                    borderRadius: '50%',
                    border: '1px solid lightgrey',
                } }));
        }
    };
    const { hasNumber, hasSpecialCharacter, hasUppercaseLetter, isLengthOk } = usePassword(value);
    return (_jsx(_Fragment, { children: _jsxs(Flex, { ...props, vertical: true, children: [_jsxs(Row, { children: [_jsx(Col, { xs: 2, children: _jsx(Typography.Text, { type: "secondary", children: getIconName(isLengthOk) }) }), _jsx(Col, { xs: "fill", children: _jsx(Typography.Text, { type: "secondary", children: "minimum 8 characters" }) })] }), _jsxs(Row, { children: [_jsx(Col, { xs: 2, children: _jsx(Typography.Text, { type: "secondary", children: getIconName(hasNumber) }) }), _jsx(Col, { xs: "fill", children: _jsxs(Typography.Text, { type: "secondary", children: [' ', "contains a number"] }) })] }), _jsxs(Row, { children: [_jsx(Col, { xs: 2, children: _jsx(Typography.Text, { type: "secondary", children: getIconName(hasUppercaseLetter) }) }), _jsx(Col, { xs: "fill", children: _jsxs(Typography.Text, { type: "secondary", children: [' ', "contains uppercase letter"] }) })] }), _jsxs(Row, { children: [_jsx(Col, { xs: 2, children: _jsx(Typography.Text, { type: "secondary", children: getIconName(hasSpecialCharacter) }) }), _jsx(Col, { xs: "fill", children: _jsxs(Typography.Text, { type: "secondary", children: [' ', "contains special character"] }) })] })] }) }));
};
