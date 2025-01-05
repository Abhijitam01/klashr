'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input, List, Avatar, Typography, Row, Col, Spin, Empty, Select, Button, Slider } from 'antd';
import { SearchOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { useAuthentication } from "../../../modules/authentication";
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api } from "../../../domain";
import { PageLayout } from "../../../layouts/Page.layout";
export default function SearchPage() {
    const router = useRouter();
    const params = useParams();
    const authentication = useAuthentication();
    const userId = authentication.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [searchTerm, setSearchTerm] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [range, setRange] = useState([0, 50]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const handleSearch = async () => {
        setLoading(true);
        try {
            const usersFound = await Api.User.findMany({
                filters: {
                    name: { ilike: `%${searchTerm}%` }
                },
                includes: ['groupMembers', 'posts'],
            });
            setUsers(usersFound);
        }
        catch (error) {
            enqueueSnackbar('Error fetching users', { variant: 'error' });
        }
        finally {
            setLoading(false);
        }
    };
    const handleFollow = async (followedUserId) => {
        try {
            // Create notification for the followed user
            await Api.Notification.createOne({
                userId: followedUserId,
                title: 'New Follow Request',
                message: `You have a new follow request from ${authentication.user?.name}`,
                senderName: authentication.user?.name,
                senderEmail: authentication.user?.email,
                senderPictureUrl: authentication.user?.pictureUrl,
                redirectUrl: `/users/${userId}`,
                dateCreated: dayjs().toISOString()
            });
            // Create notification for the following user
            await Api.Notification.createOne({
                userId: userId,
                title: 'Follow Request Sent',
                message: `Your follow request to ${followedUserId} has been sent.`,
                dateCreated: dayjs().toISOString()
            });
            enqueueSnackbar('Follow request sent', { variant: 'success' });
        }
        catch (error) {
            enqueueSnackbar('Error sending follow request', { variant: 'error' });
        }
    };
    return (_jsxs(PageLayout, { layout: "narrow", children: [_jsx(Row, { justify: "center", style: { marginBottom: '20px' }, children: _jsxs(Col, { children: [_jsx(Title, { level: 2, children: "Search Users" }), _jsx(Text, { children: "Find people in your area with similar interests." })] }) }), _jsx(Row, { justify: "center", style: { marginBottom: '20px' }, children: _jsx(Col, { span: 24, children: _jsx(Input, { placeholder: "Search by user", prefix: _jsx(SearchOutlined, {}), value: searchTerm, onChange: e => setSearchTerm(e.target.value), onPressEnter: handleSearch, allowClear: true }) }) }), _jsx(Row, { justify: "center", style: { marginBottom: '20px' }, children: _jsx(Col, { span: 24, children: _jsxs(Select, { mode: "multiple", placeholder: "Select hobbies", value: hobbies, onChange: value => setHobbies(value), style: { width: '100%' }, children: [_jsx(Select.Option, { value: "reading", children: "Reading" }), _jsx(Select.Option, { value: "sports", children: "Sports" }), _jsx(Select.Option, { value: "music", children: "Music" }), _jsx(Select.Option, { value: "traveling", children: "Traveling" })] }) }) }), _jsx(Row, { justify: "center", style: { marginBottom: '20px' }, children: _jsx(Col, { span: 24, children: _jsx(Slider, { range: true, min: 0, max: 100, value: range, onChange: value => setRange(value), tooltipVisible: true }) }) }), _jsx(Row, { justify: "center", style: { marginBottom: '20px' }, children: _jsx(Col, { span: 24, children: _jsx(Button, { type: "primary", onClick: handleSearch, children: "Search" }) }) }), _jsx(Row, { justify: "center", style: { marginBottom: '20px' }, children: _jsx(Col, { span: 24, children: _jsx(Button, { icon: _jsx(ArrowLeftOutlined, {}), onClick: () => router.back() }) }) }), _jsx(Row, { justify: "center", children: _jsx(Col, { span: 24, children: loading ? (_jsx(Spin, { tip: "Loading..." })) : users.length > 0 ? (_jsx(List, { itemLayout: "horizontal", dataSource: users, renderItem: user => (_jsx(List.Item, { actions: [
                                _jsx("a", { onClick: () => router.push(`/users/${user.id}`), children: "View Profile" }, "view"),
                                _jsx(Button, { type: "primary", onClick: () => handleFollow(user.id), children: "Follow" }, "follow")
                            ], children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: user.pictureUrl, icon: !user.pictureUrl && _jsx(UserOutlined, {}) }), title: user.name }) })) })) : (_jsx(Empty, { description: "No users found" })) }) })] }));
}
