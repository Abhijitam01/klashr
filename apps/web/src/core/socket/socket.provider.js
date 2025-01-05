import { jsx as _jsx } from "react/jsx-runtime";
import { useAuthentication } from "../../modules/authentication";
import { createContext, useContext, useState } from 'react';
import { useConfiguration } from '../configuration';
const SocketContext = createContext(undefined);
export const SocketProvider = ({ children }) => {
    const authentication = useAuthentication();
    const { apiBaseUrl: baseUrl } = useConfiguration();
    const token = authentication?.user?.id;
    const [client, setClient] = useState();
    // useEffect(() => {
    //   const userId = authentication?.user?.id
    //   if (userId) {
    //     setClient(new SocketClient({ baseUrl, token }))
    //   } else if (client) {
    //     client.stop()
    //     setClient(null)
    //   }
    //   return () => {
    //     if (client) {
    //       client.stop()
    //       setClient(null)
    //     }
    //   }
    // }, [authentication?.user?.id])
    return (_jsx(SocketContext.Provider, { value: { client }, children: children }));
};
export const useCoreSocket = () => {
    return useContext(SocketContext);
};
