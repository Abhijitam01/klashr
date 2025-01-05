'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CommentOutlined, LikeOutlined, PlusOutlined, SendOutlined, } from '@ant-design/icons';
import { Api } from "../../../domain";
import { PageLayout } from "../../../layouts/Page.layout";
import { useAuthentication } from "../../../modules/authentication";
import { Avatar, Button, Card, Input, List, Modal, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
export default function HomePage() {
    const router = useRouter();
    const params = useParams();
    const authentication = useAuthentication();
    const userId = authentication.user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [likedUsers, setLikedUsers] = useState([]);
    useEffect(() => {
        if (userId) {
            Api.PostData.findMany({ includes: ['user', 'likes', 'comments.user'] })
                .then(setPosts)
                .catch(() => enqueueSnackbar('Failed to fetch posts', { variant: 'error' }));
        }
    }, [userId]);
    const handleCreatePost = async () => {
        if (newPostContent.trim()) {
            try {
                const formData = {
                    content: newPostContent,
                };
                const newPost = await Api.PostData.createOneByUserId(userId, formData);
                setPosts([newPost, ...posts]);
                setNewPostContent('');
                enqueueSnackbar('Post created successfully', { variant: 'success' });
            }
            catch {
                enqueueSnackbar('Failed to create post', { variant: 'error' });
            }
        }
    };
    const handleLikePost = async (postId) => {
        try {
            await Api.Like.createOneByPostId(postId, { userId });
            setPosts(posts.map(post => post.id === postId
                ? {
                    ...post,
                    likes: [...(post.likes || []), { userId, user: authentication.user }],
                }
                : post));
            enqueueSnackbar('Post liked', { variant: 'success' });
        }
        catch {
            enqueueSnackbar('Failed to like post', { variant: 'error' });
        }
    };
    const handleCreateComment = async (postId) => {
        const content = newCommentContent[postId]?.trim();
        if (content) {
            try {
                const newComment = await Api.Comment.createOneByPostId(postId, {
                    content,
                    userId,
                });
                setPosts(posts.map(post => post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...(post.comments || []),
                            newComment,
                        ],
                    }
                    : post));
                setNewCommentContent({ ...newCommentContent, [postId]: '' });
                enqueueSnackbar('Comment added', { variant: 'success' });
            }
            catch {
                enqueueSnackbar('Failed to add comment', { variant: 'error' });
            }
        }
    };
    const fetchLikedUsers = async (postId) => {
        try {
            const post = posts.find(post => post.id === postId);
            if (post) {
                const userIds = post.likes?.map(like => like.userId) || [];
                const users = await Promise.all(userIds.map(id => Api.User.findOne(id)));
                setLikedUsers(users);
            }
        }
        catch {
            enqueueSnackbar('Failed to fetch liked users', { variant: 'error' });
        }
    };
    const handleShowLikesModal = async (postId) => {
        await fetchLikedUsers(postId);
        setIsModalVisible(true);
    };
    return (_jsxs(PageLayout, { layout: "narrow", children: [_jsx(Title, { level: 2, children: "Home" }), _jsx(Paragraph, { children: "View and share updates with people in your area." }), _jsxs(Card, { children: [_jsx(TextArea, { value: newPostContent, onChange: e => setNewPostContent(e.target.value), placeholder: "What's on your mind?", rows: 4 }), _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: handleCreatePost, style: { marginTop: 10 }, children: "Post" })] }), _jsx(List, { itemLayout: "vertical", size: "large", dataSource: posts, renderItem: post => (_jsx(Card, { style: { marginTop: 20 }, children: _jsxs(List.Item, { actions: [
                            _jsx(Button, { type: "link", icon: _jsx(LikeOutlined, {}), onClick: () => handleLikePost(post.id), children: post.likes?.length || 0 }, `like-${post.id}`),
                            _jsx(Button, { type: "link", icon: _jsx(LikeOutlined, {}), onClick: () => handleShowLikesModal(post.id), children: "Show Likes" }, `show-likes-${post.id}`),
                            _jsx(Button, { type: "link", icon: _jsx(CommentOutlined, {}), children: post.comments?.length || 0 }, `comment-${post.id}`),
                        ], children: [_jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: post.user?.pictureUrl }), title: _jsx("a", { onClick: () => router.push(`/users/${post.userId}`), children: post.user?.name }), description: dayjs(post.dateCreated).format('MMMM D, YYYY h:mm A') }), _jsx(Paragraph, { children: post.content }), _jsx(List, { itemLayout: "horizontal", dataSource: post.comments, renderItem: comment => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: comment.user?.pictureUrl }), title: _jsx("a", { onClick: () => router.push(`/users/${comment.userId}`), children: comment.user?.name }), description: comment.content }) }, comment.id)) }), _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(TextArea, { value: newCommentContent[post.id] || '', onChange: e => setNewCommentContent({
                                            ...newCommentContent,
                                            [post.id]: e.target.value,
                                        }), placeholder: "Add a comment", rows: 2 }), _jsx(Button, { type: "primary", icon: _jsx(SendOutlined, {}), onClick: () => handleCreateComment(post.id), children: "Comment" })] })] }, post.id) })) }), _jsx(Modal, { title: "Users who liked this post", visible: isModalVisible, onCancel: () => setIsModalVisible(false), footer: null, children: _jsx(List, { itemLayout: "horizontal", dataSource: likedUsers, renderItem: user => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: user.pictureUrl }), title: _jsx("a", { onClick: () => router.push(`/users/${user.id}`), children: user.name }) }) }, user.id)) }) })] }));
}
