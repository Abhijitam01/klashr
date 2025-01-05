'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Typography, Form, Input, Button, List, Avatar, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { useAuthentication } from "../../../modules/authentication";
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api } from "../../../domain";
import { PageLayout } from "../../../layouts/Page.layout";
export default function MyProfilePage() {
    const router = useRouter();
    const params = useParams();
    const authentication = useAuthentication();
    const userId = authentication.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    useEffect(() => {
        if (userId) {
            Api.User.findOne(userId, { includes: ['groupMembers.user'] })
                .then(setUser)
                .catch(() => enqueueSnackbar('Failed to fetch user data', { variant: 'error' }));
            // Fetch followers and following (assuming these endpoints exist)
            Api.User.findOne(userId, { includes: ['groupMembers.user'] })
                .then(user => {
                setFollowers(user.groupMembers?.map(gm => gm.user) || []);
                setFollowing(user.groupMembers?.map(gm => gm.user) || []);
            })
                .catch(() => enqueueSnackbar('Failed to fetch followers/following', {
                variant: 'error',
            }));
        }
    }, [userId]);
    const handleUpdateProfile = (values) => {
        if (userId) {
            Api.User.updateOne(userId, values)
                .then(updatedUser => {
                setUser(updatedUser);
                enqueueSnackbar('Profile updated successfully', {
                    variant: 'success',
                });
            })
                .catch(() => enqueueSnackbar('Failed to update profile', { variant: 'error' }));
        }
    };
    return (_jsxs(PageLayout, { layout: "narrow", children: [_jsx(Title, { level: 2, children: "My Profile" }), _jsx(Text, { children: "Manage your profile information and connections." }), user && (_jsxs(Form, { layout: "vertical", initialValues: user, onFinish: handleUpdateProfile, style: { marginTop: 20 }, children: [_jsx(Form.Item, { label: "Name", name: "name", children: _jsx(Input, { placeholder: "Enter your name" }) }), _jsx(Form.Item, { label: "Email", name: "email", children: _jsx(Input, { placeholder: "Enter your email" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Update Profile" }) })] })), _jsxs(Row, { gutter: 16, style: { marginTop: 40 }, children: [_jsxs(Col, { span: 12, children: [_jsx(Title, { level: 4, children: "Followers" }), _jsx(List, { itemLayout: "horizontal", dataSource: followers, renderItem: item => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(UserOutlined, {}), src: item.pictureUrl }), title: item.name, description: item.email }) })) })] }), _jsxs(Col, { span: 12, children: [_jsx(Title, { level: 4, children: "Following" }), _jsx(List, { itemLayout: "horizontal", dataSource: following, renderItem: item => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(UserOutlined, {}), src: item.pictureUrl }), title: item.name, description: item.email }) })) })] })] })] }));
}
