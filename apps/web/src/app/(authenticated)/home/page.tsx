'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Avatar, Button, Input, Card, Space } from 'antd'
import {
  LikeOutlined,
  CommentOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [posts, setPosts] = useState<Model.PostData[]>([])
  const [newPostContent, setNewPostContent] = useState<string>('')
  const [newCommentContent, setNewCommentContent] = useState<
    Record<string, string>
  >({})

  useEffect(() => {
    if (userId) {
      Api.PostData.findMany({ includes: ['user', 'likes', 'comments.user'] })
        .then(setPosts)
        .catch(() =>
          enqueueSnackbar('Failed to fetch posts', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleCreatePost = async () => {
    if (newPostContent.trim()) {
      try {
        const formData: Partial<Model.PostData> = {
          content: newPostContent,
        }

        const newPost = await Api.PostData.createOneByUserId(userId, formData)
        setPosts([newPost, ...posts])
        setNewPostContent('')
        enqueueSnackbar('Post created successfully', { variant: 'success' })
      } catch {
        enqueueSnackbar('Failed to create post', { variant: 'error' })
      }
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      await Api.Like.createOneByPostId(postId, { userId })
      setPosts(
        posts.map(post =>
          post.id === postId
            ? { ...post, likes: [...(post.likes || []), { userId }] as Model.Like[] }
            : post,
        ),
      )
      enqueueSnackbar('Post liked', { variant: 'success' })
    } catch {
      enqueueSnackbar('Failed to like post', { variant: 'error' })
    }
  }

  const handleCreateComment = async (postId: string) => {
    const content = newCommentContent[postId]?.trim()
    if (content) {
      try {
        const newComment = await Api.Comment.createOneByPostId(postId, {
          content,
          userId,
        })
        setPosts(
          posts.map(post =>
            post.id === postId
              ? { ...post, comments: [...(post.comments || []), newComment] as Model.Comment[] }
              : post,
          ),
        )
        setNewCommentContent({ ...newCommentContent, [postId]: '' })
        enqueueSnackbar('Comment added', { variant: 'success' })
      } catch {
        enqueueSnackbar('Failed to add comment', { variant: 'error' })
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Home</Title>
      <Paragraph>View and share updates with people in your area.</Paragraph>
      <Card>
        <TextArea
          value={newPostContent}
          onChange={e => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreatePost}
          style={{ marginTop: 10 }}
        >
          Post
        </Button>
      </Card>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={post => (
          <Card style={{ marginTop: 20 }}>
            <List.Item
              key={post.id}
              actions={[
                <Button
                  type="link"
                  icon={<LikeOutlined />}
                  onClick={() => handleLikePost(post.id)}
                >
                  {post.likes?.length || 0}
                </Button>,
                <Button type="link" icon={<CommentOutlined />}>
                  {post.comments?.length || 0}
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={post.user?.pictureUrl} />}
                title={
                  <a onClick={() => router.push(`/users/${post.userId}`)}>
                    {post.user?.name}
                  </a>
                }
                description={dayjs(post.dateCreated).format(
                  'MMMM D, YYYY h:mm A',
                )}
              />
              <Paragraph>{post.content}</Paragraph>
              <List
                itemLayout="horizontal"
                dataSource={post.comments}
                renderItem={comment => (
                  <List.Item key={comment.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={comment.user?.pictureUrl} />}
                      title={
                        <a
                          onClick={() =>
                            router.push(`/users/${comment.userId}`)
                          }
                        >
                          {comment.user?.name}
                        </a>
                      }
                      description={comment.content}
                    />
                  </List.Item>
                )}
              />
              <Space direction="vertical" style={{ width: '100%' }}>
                <TextArea
                  value={newCommentContent[post.id] || ''}
                  onChange={e =>
                    setNewCommentContent({
                      ...newCommentContent,
                      [post.id]: e.target.value,
                    })
                  }
                  placeholder="Add a comment"
                  rows={2}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() => handleCreateComment(post.id)}
                >
                  Comment
                </Button>
              </Space>
            </List.Item>
          </Card>
        )}
      />
    </PageLayout>
  )
}
