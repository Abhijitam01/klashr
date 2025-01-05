'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Typography, Button, List, Avatar, Input, Space, Tooltip } from 'antd';
import { LikeOutlined, LikeFilled, MessageOutlined } from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
import { useAuthentication } from "../../../../modules/authentication";
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useRouter, useParams } from 'next/navigation';
import { Api } from "../../../../domain";
import { PageLayout } from "../../../../layouts/Page.layout";
export default function GroupDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const authentication = useAuthentication();
    const userId = authentication.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [group, setGroup] = useState(null);
    const [isMember, setIsMember] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const groupData = await Api.Group.findOne(params.groupId, {
                    includes: [
                        'groupMembers.user',
                        'groupPosts.groupPostLikes',
                        'groupPosts.groupPostComments.user',
                    ],
                });
                setGroup(groupData);
                setIsMember(groupData.groupMembers?.some(member => member.userId === userId) ??
                    false);
            }
            catch (error) {
                enqueueSnackbar('Failed to load group details', { variant: 'error' });
            }
            finally {
                setLoading(false);
            }
        };
        fetchGroupDetails();
    }, [params.groupId, userId]);
    const handleJoinGroup = async () => {
        try {
            await Api.GroupMember.createOneByGroupId(params.groupId, { userId });
            setIsMember(true);
            enqueueSnackbar('Successfully joined the group', { variant: 'success' });
        }
        catch (error) {
            enqueueSnackbar('Failed to join the group', { variant: 'error' });
        }
    };
    const handleLeaveGroup = async () => {
        try {
            const groupMember = group?.groupMembers?.find(member => member.userId === userId);
            if (groupMember) {
                await Api.GroupMember.deleteOne(groupMember.id);
                setIsMember(false);
                enqueueSnackbar('Successfully left the group', { variant: 'success' });
            }
        }
        catch (error) {
            enqueueSnackbar('Failed to leave the group', { variant: 'error' });
        }
    };
    const handleCreatePost = async () => {
        try {
            await Api.GroupPost.createOneByUserId(userId, {
                content: newPostContent,
                groupId: params.groupId,
            });
            setNewPostContent('');
            enqueueSnackbar('Post created successfully', { variant: 'success' });
            // Refresh group details to show the new post
            const groupData = await Api.Group.findOne(params.groupId, {
                includes: [
                    'groupMembers.user',
                    'groupPosts.groupPostLikes',
                    'groupPosts.groupPostComments.user',
                ],
            });
            setGroup(groupData);
        }
        catch (error) {
            enqueueSnackbar('Failed to create post', { variant: 'error' });
        }
    };
    const handleLikePost = async (postId) => {
        try {
            await Api.GroupPostLike.createOneByUserId(userId, { groupPostId: postId });
            enqueueSnackbar('Post liked', { variant: 'success' });
            // Refresh group details to show the new like
            const groupData = await Api.Group.findOne(params.groupId, {
                includes: [
                    'groupMembers.user',
                    'groupPosts.groupPostLikes',
                    'groupPosts.groupPostComments.user',
                ],
            });
            setGroup(groupData);
        }
        catch (error) {
            enqueueSnackbar('Failed to like post', { variant: 'error' });
        }
    };
    if (loading) {
        return _jsx(PageLayout, { layout: "narrow", children: "Loading..." });
    }
    return (_jsxs(PageLayout, { layout: "narrow", children: [_jsx(Title, { level: 2, children: group?.name }), _jsx(Paragraph, { children: group?.description }), _jsx(Space, { children: isMember ? (_jsx(Button, { type: "primary", danger: true, onClick: handleLeaveGroup, children: "Leave Group" })) : (_jsx(Button, { type: "primary", onClick: handleJoinGroup, children: "Join Group" })) }), isMember && (_jsxs("div", { style: { marginTop: '20px' }, children: [_jsx(Title, { level: 3, children: "Create a Post" }), _jsx(TextArea, { rows: 4, value: newPostContent, onChange: e => setNewPostContent(e.target.value), placeholder: "What's on your mind?" }), _jsx(Button, { type: "primary", onClick: handleCreatePost, style: { marginTop: '10px' }, children: "Post" })] })), _jsx(Title, { level: 3, style: { marginTop: '40px' }, children: "Posts" }), _jsx(List, { itemLayout: "vertical", size: "large", dataSource: group?.groupPosts, renderItem: post => (_jsxs(List.Item, { actions: [
                        _jsx(Tooltip, { title: "Like", children: _jsxs("span", { onClick: () => handleLikePost(post.id), children: [post.groupPostLikes?.some(like => like.userId === userId) ? (_jsx(LikeFilled, {})) : (_jsx(LikeOutlined, {})), _jsx("span", { className: "comment-action", children: post.groupPostLikes?.length })] }) }, "like"),
                        _jsx(Tooltip, { title: "Comment", children: _jsxs("span", { children: [_jsx(MessageOutlined, {}), _jsx("span", { className: "comment-action", children: post.groupPostComments?.length })] }) }, "comment"),
                    ], children: [_jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: post.user?.pictureUrl }), title: post.user?.name, description: dayjs(post.dateCreated).format('MMMM D, YYYY h:mm A') }), post.content, _jsx(List, { itemLayout: "horizontal", dataSource: post.groupPostComments, renderItem: comment => (_jsxs("li", { children: [_jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: comment.user?.pictureUrl }), title: comment.user?.name, description: dayjs(comment.dateCreated).format('MMMM D, YYYY h:mm A') }), _jsx("div", { children: comment.content })] }, comment.id)) })] }, post.id)) })] }));
}
