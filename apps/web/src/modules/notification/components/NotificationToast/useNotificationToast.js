import { useHttpAction } from "../../../../core/http/http.action.hook";
import { useCoreStore } from "../../../../core/store";
import { Api } from "../../../../domain";
import { useRouter } from 'next/navigation';
export const useNotificationToast = () => {
    const router = useRouter();
    const { notifications, setNotifications } = useCoreStore();
    const actionDelete = useHttpAction();
    const handleDelete = (notification) => {
        actionDelete.run(() => Api.Notification.deleteOneByMe(notification.id)
            .catch(() => { })
            .then(() => {
            const notificationsUpdated = [...notifications];
            const index = notifications.findIndex(item => item.id === notification.id);
            if (index > -1) {
                notificationsUpdated.splice(index, 1);
            }
            setNotifications(notificationsUpdated);
        })
            .catch(() => { }));
    };
    const handleClick = (notification) => {
        if (notification.redirectUrl) {
            router.push(notification.redirectUrl);
            handleDelete(notification);
        }
    };
    return { onDelete: handleDelete, onClick: handleClick };
};
