import { useSocket } from "../../core/socket";
export const useNotificationCreated = (callback) => {
    return useSocket('notification.created', callback);
};
