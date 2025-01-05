import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { BellOutlined } from '@ant-design/icons';
import { RouterObject } from "../../../../core/router";
import { useCoreStore } from "../../../../core/store";
import { Badge, Button } from 'antd';
import { useRouter } from 'next/navigation';
export const TabNotification = () => {
    const router = useRouter();
    const store = useCoreStore();
    const countNotifications = store.notifications.length;
    const goTo = (url) => {
        router.push(url);
    };
    return (_jsx(_Fragment, { children: _jsx(Badge, { count: countNotifications, overflowCount: 99, children: _jsx(Button, { onClick: () => goTo(RouterObject.route.NOTIFICATIONS), icon: _jsx(BellOutlined, {}), shape: "circle" }) }) }));
};
