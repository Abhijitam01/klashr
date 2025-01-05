import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from 'antd';
export const Actions = ({ canClearAll, onClearAll, isLoadingClearAll, }) => {
    return (_jsx(_Fragment, { children: canClearAll && (_jsx(Button, { onClick: onClearAll, loading: isLoadingClearAll, children: "Clear All" })) }));
};
