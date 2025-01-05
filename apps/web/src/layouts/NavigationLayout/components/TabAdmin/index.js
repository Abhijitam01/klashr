import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCoreStore } from "../../../../core/store";
import { Tag } from 'antd';
export const TabAdmin = () => {
    const store = useCoreStore();
    return (_jsx(_Fragment, { children: store.isAdmin && (_jsx("div", { children: _jsx(Tag, { color: "red", children: "Admin" }) })) }));
};
