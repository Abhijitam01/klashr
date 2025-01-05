import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { List, Typography } from 'antd';
import { NotificationCard } from './components/NotificationCard';
const { Text } = Typography;
export const NotificationList = ({ notifications, onDelete, onClick, }) => {
    const isEmpty = notifications.length === 0;
    return (_jsx(_Fragment, { children: isEmpty ? (_jsx(Text, { type: "secondary", children: "You have no notifications" })) : (_jsx(List, { itemLayout: "horizontal", dataSource: notifications, renderItem: notification => (_jsx(List.Item, { style: { width: '100%' }, children: _jsx(NotificationCard, { notification: notification, onClick: () => onClick(notification), onDelete: () => onDelete(notification) }) })) })) }));
};
