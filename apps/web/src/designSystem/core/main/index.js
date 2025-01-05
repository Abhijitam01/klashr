import { jsx as _jsx } from "react/jsx-runtime";
import { Snackbar } from "../..";
import { Layout } from 'antd';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { MrbSplashScreen } from '../splashScreen';
export const MrbMain = ({ name, children }) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (isLoading) {
            setLoading(false);
        }
    }, []);
    const snackbar = useSnackbar();
    Snackbar.Instance.setup(snackbar);
    return (_jsx(Layout, { className: "mrb-main", children: isLoading ? _jsx(MrbSplashScreen, { name: name }) : children }));
};
