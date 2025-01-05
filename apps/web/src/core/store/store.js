import { jsx as _jsx } from "react/jsx-runtime";
import { AuthorizationManager } from "../../domain/authorization";
import { createContext, useContext, useState } from 'react';
const StoreContext = createContext(undefined);
export const useCoreStore = () => {
    return useContext(StoreContext);
};
export const CoreStoreProvider = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const isAdmin = roles.some(role => AuthorizationManager.isAdmin(role));
    return (_jsx(StoreContext.Provider, { value: { roles, setRoles, notifications, setNotifications, isAdmin }, children: children }));
};
