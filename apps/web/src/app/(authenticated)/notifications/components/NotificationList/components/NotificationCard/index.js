import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
const { Text, Paragraph } = Typography;
export const NotificationCard = ({ notification, onClick, onDelete, }) => {
    return (_jsx(Card, { onClick: onClick, style: { marginBottom: 16, width: '100%' }, children: _jsxs(Flex, { gap: "middle", children: [_jsx(Avatar, { src: notification.senderPictureUrl, children: notification.senderName[0] }), _jsxs(Flex, { vertical: true, flex: 1, children: [_jsx(Text, { strong: true, children: notification.title }), _jsx(Paragraph, { children: notification.message })] }), _jsx(Button, { type: "text", icon: _jsx(CloseOutlined, {}), onClick: e => {
                        e.stopPropagation();
                        onDelete();
                    } })] }) }));
};
