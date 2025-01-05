'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Typography, Button, Form, Input, List, Card, Modal, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;
import { useAuthentication } from "../../../modules/authentication";
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api } from "../../../domain";
import { PageLayout } from "../../../layouts/Page.layout";
export default function GroupsPage() {
    const router = useRouter();
    const params = useParams();
    const authentication = useAuthentication();
    const userId = authentication.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [groups, setGroups] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsFound = await Api.Group.findMany({
                    includes: ['groupMembers', 'groupMembers.user'],
                });
                setGroups(groupsFound);
            }
            catch (error) {
                enqueueSnackbar('Failed to fetch groups', { variant: 'error' });
            }
        };
        fetchGroups();
    }, []);
    const handleCreateGroup = async (values) => {
        try {
            await Api.Group.createOne(values);
            enqueueSnackbar('Group created successfully', { variant: 'success' });
            setIsModalVisible(false);
            form.resetFields();
            const groupsFound = await Api.Group.findMany({
                includes: ['groupMembers', 'groupMembers.user'],
            });
            setGroups(groupsFound);
        }
        catch (error) {
            enqueueSnackbar('Failed to create group', { variant: 'error' });
        }
    };
    return (_jsxs(PageLayout, { layout: "narrow", children: [_jsx(Title, { level: 2, children: "Groups" }), _jsx(Paragraph, { children: "As a user, you can view a list of groups and create new groups to connect with like-minded people in your area." }), _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: () => setIsModalVisible(true), children: "Create New Group" }), _jsx(List, { grid: { gutter: 16, column: 3 }, dataSource: groups, renderItem: group => (_jsx(List.Item, { children: _jsx(Card, { title: group.name, onClick: () => router.push(`/groups/${group.id}`), children: _jsx("p", { children: group.description }) }) })) }), _jsx(Modal, { title: "Create New Group", visible: isModalVisible, onCancel: () => setIsModalVisible(false), footer: null, children: _jsxs(Form, { form: form, onFinish: handleCreateGroup, children: [_jsx(Form.Item, { name: "name", label: "Group Name", rules: [
                                { required: true, message: 'Please input the group name!' },
                            ], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "description", label: "Description", children: _jsx(Input.TextArea, { rows: 4 }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Create" }) })] }) })] }));
}
