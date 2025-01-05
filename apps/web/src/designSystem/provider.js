'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ConfigProvider } from 'antd';
import { createContext, useContext, useEffect, useState, } from 'react';
import { Snackbar } from './providers/snackbar';
import './style/main.scss';
import { Theme } from './theme/theme';
const DesignSystemContext = createContext(undefined);
export const useDesignSystem = () => {
    return useContext(DesignSystemContext);
};
export var DesignSystem;
(function (DesignSystem) {
    DesignSystem.Provider = ({ children }) => {
        const [isMobile, setMobile] = useState(false);
        const isWindow = typeof window !== 'undefined';
        const theme = Theme;
        useEffect(() => {
            if (!isWindow) {
                return;
            }
            setMobile(window.innerWidth < 992);
            const handleResize = () => {
                setMobile(window.innerWidth < 992);
            };
            // Attach the event listener
            window.addEventListener('resize', handleResize);
            // Cleanup the event listener on component unmount
            return () => {
                if (!isWindow) {
                    return;
                }
                window.removeEventListener('resize', handleResize);
            };
        }, []);
        return (_jsx(ConfigProvider, { theme: theme, children: _jsx(DesignSystemContext.Provider, { value: { isMobile }, children: children }) }));
    };
    DesignSystem.Nested = ({ children }) => {
        return _jsx(Snackbar.Provider, { children: children });
    };
})(DesignSystem || (DesignSystem = {}));
