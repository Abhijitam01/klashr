import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useCoreStore } from "../../../core/store";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export const AuthorizationGuard = ({ children, roles = [], }) => {
    const store = useCoreStore();
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const isAuthorised = store.roles.some(role => roles.includes(role.name));
        if (!isAuthorised) {
            router.push('/');
            return;
        }
        setLoading(false);
    }, [roles]);
    return _jsx(_Fragment, { children: !isLoading ? _jsx(_Fragment, { children: "Loading" }) : children });
};
