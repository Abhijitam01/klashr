'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Flex, Typography, Button } from 'antd';
import { useHttpAction } from "../../../core/http/http.action.hook";
import { useCoreStore } from "../../../core/store";
import { Api } from "../../../domain";
import { PageLayout } from "../../../layouts/Page.layout";
import { useNotificationToast } from "../../../modules/notification/components";
import { Actions } from './components/Actions';
import { NotificationList } from './components/NotificationList';
const { Title } = Typography;
export default function NotificationsPage() {
    const { notifications, setNotifications } = useCoreStore();
    const notificationToast = useNotificationToast();
    const actionClearAll = useHttpAction();
    const actionFollowBack = useHttpAction();
    useEffect(() => {
        Api.User.findMe().then(user => {
            // Removed references to followers and followRequests
        });
    }, []);
    const handleClearAll = () => {
        actionClearAll.run(() => Api.Notification.deleteAllByMe().then(() => setNotifications([])));
    };
    const handleFollowBack = (userId) => {
        // Removed followBack method handling
    };
    const canClearAll = notifications.length > 0;
    return (_jsxs(PageLayout, { layout: "super-narrow", children: [_jsxs(Flex, { justify: "space-between", align: "center", children: [_jsx(Title, { level: 1, children: "Notifications" }), _jsx(Actions, { canClearAll: canClearAll, isLoadingClearAll: actionClearAll.isLoading, onClearAll: handleClearAll })] }), _jsxs(Flex, { justify: "space-between", align: "center", style: { marginBottom: '1rem' }, children: [_jsx("div", {}), _jsx(Button, { type: "primary", onClick: () => handleFollowBack('user-id'), loading: actionFollowBack.isLoading, children: "Accept and Follow Back" })] }), _jsx(NotificationList, { notifications: notifications, onClick: notificationToast.onClick, onDelete: notificationToast.onDelete })] }));
}
