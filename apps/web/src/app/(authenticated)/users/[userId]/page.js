'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Typography, Button, Avatar, List } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;
import { useAuthentication } from "../../../../modules/authentication";
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api } from "../../../../domain";
import { PageLayout } from "../../../../layouts/Page.layout";
export default function UserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const authentication = useAuthentication();
    const userId = authentication.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [userProfile, setUserProfile] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const user = await Api.User.findOne(params.userId, {
                    includes: ['posts'],
                });
                setUserProfile(user);
                // Check if the current user is following the profile user
                // Assuming there's an API endpoint to check following status
                // setIsFollowing(await Api.User.isFollowing(userId, params.userId))
            }
            catch (error) {
                enqueueSnackbar('Failed to fetch user profile', { variant: 'error' });
            }
        };
        fetchUserProfile();
    }, [params.userId]);
    const handleFollow = async () => {
        try {
            // Assuming there's an API endpoint to follow a user
            // await Api.User.follow(userId, params.userId)
            setIsFollowing(true);
            enqueueSnackbar('Successfully followed the user', { variant: 'success' });
        }
        catch (error) {
            enqueueSnackbar('Failed to follow the user', { variant: 'error' });
        }
    };
    const handleUnfollow = async () => {
        try {
            // Assuming there's an API endpoint to unfollow a user
            // await Api.User.unfollow(userId, params.userId)
            setIsFollowing(false);
            enqueueSnackbar('Successfully unfollowed the user', {
                variant: 'success',
            });
        }
        catch (error) {
            enqueueSnackbar('Failed to unfollow the user', { variant: 'error' });
        }
    };
    return (_jsxs(PageLayout, { layout: "narrow", children: [_jsx(Title, { level: 2, children: "User Profile" }), _jsx(Paragraph, { children: "View and interact with user profiles and their posts." }), userProfile && (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Avatar, { size: 64, src: userProfile.pictureUrl }), _jsx(Title, { level: 3, children: userProfile.name }), userId === userProfile.id ? (_jsx(Text, { children: userProfile.email })) : null, _jsx("br", {}), _jsx(Button, { type: "primary", icon: isFollowing ? _jsx(UserDeleteOutlined, {}) : _jsx(UserAddOutlined, {}), onClick: isFollowing ? handleUnfollow : handleFollow, children: isFollowing ? 'Unfollow' : 'Follow' }), _jsx(Title, { level: 4, style: { marginTop: '20px' }, children: "Posts" }), _jsx(List, { itemLayout: "vertical", size: "large", dataSource: userProfile.posts, renderItem: post => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { title: _jsx("a", { href: `/posts/${post.id}`, children: dayjs(post.dateCreated).format('MMMM D, YYYY') }), description: post.content }) }, post.id)) })] }))] }));
}
