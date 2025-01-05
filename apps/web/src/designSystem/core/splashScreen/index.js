import { jsx as _jsx } from "react/jsx-runtime";
import { Layout, Typography } from 'antd';
import { useEffect, useState } from 'react';
export const MrbSplashScreen = ({ name }) => {
    const [isPageInitialised, setPageInitialised] = useState(false);
    useEffect(() => {
        setPageInitialised(true);
    }, []);
    if (!isPageInitialised) {
        return null;
    }
    return (_jsx(Layout, { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }, children: _jsx(Typography, { style: { letterSpacing: '3px' }, children: name }) }));
};
