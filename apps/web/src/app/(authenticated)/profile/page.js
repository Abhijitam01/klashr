'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RouterObject } from "../../../core/router";
import { Api } from "../../../domain";
import { AuthenticationHook } from "../../../domain/authentication";
import { PageLayout } from "../../../layouts/Page.layout";
import { Utility } from "../../../libraries/utility";
import { useAuthentication } from "../../../modules/authentication";
import { Avatar, Button, Input, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { UserForm } from './components/userForm';
const { Title } = Typography;
export default function ProfilePage() {
    const authentication = useAuthentication();
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const { removeToken } = AuthenticationHook.useToken();
    const user = authentication.user;
    const userInitials = Utility.stringToInitials(user.name);
    const [isLoading, setLoading] = useState(false);
    const [isLoadingLogout, setLoadingLogout] = useState(false);
    const [hobbies, setHobbies] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [lastUpdateTime, setLastUpdateTime] = useState(null);
    const [newHobby, setNewHobby] = useState('');
    useEffect(() => {
        const fetchHobbies = async () => {
            try {
                const hobbies = await Api.Like.findManyByUserId(user.id);
                setHobbies(hobbies);
                setSelectedHobbies(hobbies);
            }
            catch (error) {
                enqueueSnackbar('Could not fetch hobbies', { variant: 'error' });
            }
        };
        const fetchLastUpdateTime = async () => {
            try {
                const user = await Api.User.findMe();
                setLastUpdateTime(new Date(user.dateUpdated));
            }
            catch (error) {
                enqueueSnackbar('Could not fetch last update time', {
                    variant: 'error',
                });
            }
        };
        fetchHobbies();
        fetchLastUpdateTime();
    }, [user.id, enqueueSnackbar]);
    const handleSubmit = async (userData) => {
        setLoading(true);
        try {
            const userUpdated = await Api.User.updateOne(user.id, {
                ...userData,
                likes: selectedHobbies, // This needs to be an array of Like objects, not IDs
            });
            authentication.setUser(userUpdated);
        }
        catch (error) {
            enqueueSnackbar('Could not save information', { variant: 'error' });
        }
        setLoading(false);
    };
    const handleClickLogout = async () => {
        setLoadingLogout(true);
        try {
            await Api.Authentication.logout(document);
            removeToken();
            authentication.logout();
            router.push(RouterObject.route.LOGIN);
        }
        catch (error) {
            enqueueSnackbar('Could not logout', { variant: 'error' });
            setLoadingLogout(false);
        }
    };
    const handleAddHobby = async () => {
        if (!newHobby.trim())
            return;
        try {
            const createdHobby = await Api.Like.createOneByUserId(user.id, {
                id: newHobby,
                userId: user.id,
                postId: '',
            }); // Assuming postId is required but not provided
            setHobbies(prevHobbies => [...prevHobbies, createdHobby]);
            setSelectedHobbies(prevHobbies => [...prevHobbies, createdHobby]);
            setNewHobby('');
            await Api.User.updateOne(user.id, {
                likes: [...selectedHobbies, createdHobby],
            });
            setLastUpdateTime(new Date());
        }
        catch (error) {
            enqueueSnackbar('Could not add new hobby', { variant: 'error' });
        }
    };
    const is24HoursPassed = () => {
        if (!lastUpdateTime)
            return true;
        const now = dayjs();
        const lastUpdate = dayjs(lastUpdateTime);
        return now.diff(lastUpdate, 'hour') >= 24;
    };
    return (_jsxs(PageLayout, { layout: "super-narrow", children: [_jsxs("div", { style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, children: [_jsx(Title, { level: 1, children: "Profile" }), _jsx(Button, { onClick: handleClickLogout, loading: isLoadingLogout, children: "Logout" })] }), _jsx("div", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '30px',
                }, children: _jsx(Avatar, { size: 80, src: user?.pictureUrl, children: userInitials }) }), _jsx(UserForm, { user: user, isLoading: isLoading, isDisabled: isLoadingLogout, onSubmit: handleSubmit }), _jsxs("div", { style: { marginTop: '20px' }, children: [_jsx(Title, { level: 2, children: "Hobbies" }), _jsx(Input, { style: { marginTop: '10px' }, placeholder: "Add new hobby", value: newHobby, onChange: e => setNewHobby(e.target.value) }), _jsx(Button, { onClick: handleAddHobby, style: { marginTop: '10px' }, children: "Add Hobby" }), _jsx("div", { style: { marginTop: '20px' }, children: selectedHobbies.map(hobby => (_jsx("div", { children: hobby.id }, hobby.id))) }), _jsx(Button, { onClick: () => handleSubmit({ likes: selectedHobbies }), style: { marginTop: '20px' }, loading: isLoading, children: "Save" })] })] }));
}
