'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useCoreStore } from "../../core/store";
import { useNotificationCreated } from "../../domain/notification";
import { NavigationLayout } from "../../layouts/NavigationLayout";
import { AuthenticationGuard } from "../../modules/authentication";
import { UserCodeVerification } from "../../modules/user/components";
export default function AuthenticatedLayout({ children, }) {
    const store = useCoreStore();
    useNotificationCreated((notification) => {
        const notificationsUpdated = [...store.notifications];
        notificationsUpdated.push(notification);
        store.setNotifications(notificationsUpdated);
    });
    return (_jsx(AuthenticationGuard, { type: "authenticated", children: _jsx(UserCodeVerification, { children: _jsx(NavigationLayout, { children: children }) }) }));
}
