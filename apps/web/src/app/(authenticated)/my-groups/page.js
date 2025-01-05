'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Api } from "../../../domain";
import { Button, List, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const { Title, Text } = Typography;
export default function MyGroupsPage() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const userId = 'currentUserId'; // Replace with actual user ID
    useEffect(() => {
        async function fetchGroups() {
            try {
                const groupMembers = await Api.GroupMember.findManyByUserId(userId);
                setGroups(groupMembers);
            }
            catch (error) {
                message.error('Failed to fetch groups');
            }
            finally {
                setLoading(false);
            }
        }
        fetchGroups();
    }, [userId]);
    const handleDirectMessage = async (groupId) => {
        try {
            const newMessage = await Api.DirectMessage.createOneBySenderId(userId, {
                content: 'Hello!',
                receiverId: groupId,
            });
            router.push(`/messages/${userId}`);
        }
        catch (error) {
            message.error('Failed to send message');
        }
    };
    return (_jsxs("div", { children: [_jsx(Title, { level: 2, children: "My Groups" }), _jsxs(Text, { children: ["You have joined ", groups.length, " groups."] }), _jsx(List, { loading: loading, dataSource: groups, renderItem: groupMember => (_jsx(List.Item, { actions: [
                        _jsx(Button, { type: "primary", onClick: () => handleDirectMessage(groupMember.groupId), children: "Message Group" }, `direct-message-${groupMember.id}`),
                    ], children: _jsx(List.Item.Meta, { title: groupMember.group?.name, description: groupMember.group?.description }) })) })] }));
}
