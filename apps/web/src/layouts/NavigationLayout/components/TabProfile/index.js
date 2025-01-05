import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { RouterObject } from "../../../../core/router";
import { Utility } from "../../../../libraries/utility";
import { useAuthentication } from "../../../../modules/authentication";
import { Avatar } from 'antd';
import { useRouter } from 'next/navigation';
export const TabProfile = () => {
    const router = useRouter();
    const authentication = useAuthentication();
    const user = authentication.user;
    const userInitials = Utility.stringToInitials(user.name);
    const goTo = (url) => {
        router.push(url);
    };
    return (_jsx(_Fragment, { children: _jsx(Avatar, { src: user?.pictureUrl, alt: user?.name, size: "default", onClick: () => goTo(RouterObject.route.PROFILE), style: { cursor: 'pointer' }, children: userInitials }) }));
};
