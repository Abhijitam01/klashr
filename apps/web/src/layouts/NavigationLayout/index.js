import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { RouterObject } from "../../core/router";
import { useDesignSystem } from "../../designSystem";
import { useAuthentication } from "../../modules/authentication";
import { Col, Layout, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { Leftbar } from './components/Leftbar';
import { Logo } from './components/Logo';
import { SubNavigation } from './components/SubNavigation';
import { Topbar } from './components/Topbar/index.layout';
export const NavigationLayout = ({ children }) => {
    const router = useRouter();
    const authentication = useAuthentication();
    const user = authentication?.user;
    const { isMobile } = useDesignSystem();
    const goTo = (url) => {
        router.push(url);
    };
    const goToUserPage = (url) => {
        router.push(url.replace(':id', user?.id));
    };
    let itemsLeftbar = [];
    let itemsUser = [];
    let itemsTopbar = [
        {
            key: '/home',
            label: 'Home',
            onClick: () => goTo('/home'),
        },
        {
            key: '/groups',
            label: 'Groups',
            onClick: () => goTo('/groups'),
        },
        {
            key: '/search',
            label: 'Search',
            onClick: () => goTo('/search'),
        },
        {
            key: '/messages',
            label: 'Direct Messages',
            onClick: () => goTo('/messages'),
        },
        {
            key: '/my-groups',
            label: 'My Groups',
            onClick: () => goTo('/my-groups'),
        },
    ];
    let itemsSubNavigation = [
        {
            key: '/home',
            label: 'Home',
        },
        {
            key: '/groups',
            label: 'Groups',
        },
        {
            key: '/groups/:groupId',
            label: 'Group Details',
        },
        {
            key: '/search',
            label: 'Search',
        },
        {
            key: '/users/:userId',
            label: 'User Profile',
        },
        {
            key: '/messages',
            label: 'Direct Messages',
        },
        {
            key: '/my-groups',
            label: 'My Groups',
        },
    ];
    let itemsMobile = [
        {
            key: 'profile',
            label: 'Profile',
            onClick: () => goTo(RouterObject.route.PROFILE),
        },
        {
            key: 'notifications',
            label: 'Notifications',
            onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
        },
        ...itemsTopbar,
        ...itemsLeftbar,
    ];
    const isLeftbar = (itemsLeftbar.length > 0 || itemsUser.length > 0) &&
        !isMobile &&
        authentication.isLoggedIn;
    if (!authentication.isLoggedIn) {
        itemsLeftbar = [];
        itemsUser = [];
        itemsTopbar = [];
        itemsSubNavigation = [];
        itemsMobile = [];
    }
    return (_jsx(_Fragment, { children: _jsx(Layout, { children: _jsxs(Row, { style: {
                    height: '100vh',
                    width: '100vw',
                }, children: [isLeftbar && (_jsx(Col, { children: _jsx(Leftbar, { items: itemsLeftbar, itemsUser: itemsUser, logo: _jsx(Logo, { className: "m-2" }) }) })), _jsxs(Col, { style: {
                            flex: 1,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }, children: [_jsx(Topbar, { isMobile: isMobile, isLoggedIn: authentication.isLoggedIn, items: itemsTopbar, itemsMobile: itemsMobile, logo: !isLeftbar && _jsx(Logo, { width: 40, height: 40 }) }), _jsxs(Col, { style: {
                                    flex: 1,
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }, children: [_jsx(SubNavigation, { items: itemsSubNavigation }), children] })] })] }) }) }));
};
