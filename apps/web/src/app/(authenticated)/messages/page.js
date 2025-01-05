'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Typography, Input, Button, List, Avatar, Row, Col, Dropdown, Menu } from 'antd';
import { SendOutlined, SearchOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { TextArea } = Input;
import { useAuthentication } from "../../../modules/authentication";
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api } from "../../../domain";
import { PageLayout } from "../../../layouts/Page.layout";
export default function DirectMessagesPage() {
    const router = useRouter();
    const params = useParams();
    const authentication = useAuthentication();
    const userId = authentication.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [receiver, setReceiver] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [invitationStatus, setInvitationStatus] = useState(null);
    useEffect(() => {
        if (userId && params.userId) {
            fetchMessages();
            fetchReceiver();
        }
    }, [userId, params.userId]);
    const fetchMessages = async () => {
        try {
            const user = await Api.User.findOne(userId, {
                includes: [
                    'directMessagesAsSender.sender',
                    'directMessagesAsSender.receiver',
                    'directMessagesAsReceiver.sender',
                    'directMessagesAsReceiver.receiver',
                ],
            });
            const allMessages = [
                ...(user.directMessagesAsSender || []),
                ...(user.directMessagesAsReceiver || []),
            ].filter(dm => dm.senderId === params.userId || dm.receiverId === params.userId);
            setMessages(allMessages);
        }
        catch (error) {
            enqueueSnackbar('Failed to fetch messages', { variant: 'error' });
        }
    };
    const fetchReceiver = async () => {
        try {
            const user = await Api.User.findOne(params.userId);
            setReceiver(user);
        }
        catch (error) {
            enqueueSnackbar('Failed to fetch receiver', { variant: 'error' });
        }
    };
    const handleSendMessage = async () => {
        if (invitationStatus !== 'accepted') {
            enqueueSnackbar('You cannot send messages until the invitation is accepted', { variant: 'error' });
            return;
        }
        if (!messageContent.trim()) {
            enqueueSnackbar('Message content cannot be empty', { variant: 'error' });
            return;
        }
        try {
            const newMessage = await Api.DirectMessage.createOneBySenderId(userId, {
                content: messageContent,
                receiverId: params.userId,
            });
            setMessages([...messages, newMessage]);
            setMessageContent('');
            enqueueSnackbar('Message sent successfully', { variant: 'success' });
        }
        catch (error) {
            enqueueSnackbar('Failed to send message', { variant: 'error' });
        }
    };
    const handleUserClick = (userId) => {
        router.push(`/messages/${userId}`);
    };
    const handleSearch = async () => {
        try {
            const users = await Api.User.findMany({
                filters: {
                    name: { ilike: `%${searchQuery}%` }
                }
            });
            setSearchResults(users);
        }
        catch (error) {
            enqueueSnackbar('Failed to fetch users', { variant: 'error' });
        }
    };
    const handleSearchResultClick = (user) => {
        setSearchQuery('');
        setSearchResults([]);
        handleUserClick(user.id);
    };
    const handleInviteUser = () => {
        setInvitationStatus('pending');
        enqueueSnackbar('Invitation sent', { variant: 'info' });
    };
    const handleAcceptInvitation = () => {
        setInvitationStatus('accepted');
        enqueueSnackbar('Invitation accepted', { variant: 'success' });
    };
    const handleRejectInvitation = () => {
        setInvitationStatus('rejected');
        enqueueSnackbar('Invitation rejected', { variant: 'error' });
    };
    return (_jsxs(PageLayout, { layout: "narrow", children: [_jsx(Row, { justify: "center", align: "middle", style: { textAlign: 'center', marginBottom: '20px' }, children: _jsxs(Col, { children: [_jsx(Title, { level: 2, children: "Direct Messages" }), _jsxs(Text, { children: ["Private conversation with ", receiver?.name || 'User'] })] }) }), _jsx(Row, { gutter: 16, style: { marginBottom: '20px' }, children: _jsxs(Col, { span: 24, children: [_jsx(Input, { placeholder: "Search users...", value: searchQuery, onChange: e => setSearchQuery(e.target.value), suffix: _jsx(SearchOutlined, { onClick: handleSearch }) }), searchResults.length > 0 && (_jsx(Dropdown, { overlay: _jsx(Menu, { children: searchResults.map(user => (_jsxs(Menu.Item, { onClick: () => handleSearchResultClick(user), children: [_jsx(Avatar, { src: user.pictureUrl }), _jsx(Text, { children: user.name })] }, user.id))) }), visible: searchResults.length > 0, children: _jsx("div", {}) }))] }) }), _jsx(Row, { gutter: 16, children: _jsxs(Col, { span: 24, children: [_jsx(List, { itemLayout: "horizontal", dataSource: messages, renderItem: message => (_jsxs(List.Item, { children: [_jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: message.sender?.pictureUrl }), title: message.senderId === userId ? 'You' : message.sender?.name, description: message.content }), _jsx(Text, { type: "secondary", children: dayjs(message.dateCreated).format('DD/MM/YYYY HH:mm') })] })) }), _jsxs(Row, { justify: "center", align: "middle", style: { marginTop: '20px' }, children: [_jsx(Col, { span: 24, children: _jsx(TextArea, { rows: 4, value: messageContent, onChange: e => setMessageContent(e.target.value), placeholder: "Type your message here..." }) }), _jsx(Col, { span: 24, style: { textAlign: 'right', marginTop: '10px' }, children: _jsx(Button, { type: "primary", icon: _jsx(SendOutlined, {}), onClick: handleSendMessage, children: "Send" }) })] }), _jsx(Row, { justify: "center", align: "middle", style: { marginTop: '20px' }, children: _jsxs(Col, { span: 24, style: { textAlign: 'center' }, children: [invitationStatus === null && (_jsx(Button, { type: "primary", onClick: handleInviteUser, children: "Invite to Conversation" })), invitationStatus === 'pending' && (_jsxs(_Fragment, { children: [_jsx(Text, { children: "Invitation pending..." }), _jsx(Button, { type: "primary", onClick: handleAcceptInvitation, style: { marginLeft: '10px' }, children: "Accept" }), _jsx(Button, { type: "default", onClick: handleRejectInvitation, style: { marginLeft: '10px' }, children: "Reject" })] })), invitationStatus === 'accepted' && (_jsx(Text, { children: "Invitation accepted. You can now send messages." })), invitationStatus === 'rejected' && (_jsx(Text, { children: "Invitation rejected. You cannot send messages." }))] }) })] }) })] }));
}
