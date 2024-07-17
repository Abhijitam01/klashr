'use client'

import {
  CommentOutlined,
  LikeOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Card, Input, List, Modal, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [likedUsers, setLikedUsers] = useState<Model.User[]>([])

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
            ? {
                ...post,
                likes: [...(post.likes || []), { userId, user: authentication.user }] as Model.Like[],
              }
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
              ? {
                  ...post,
                  comments: [
                    ...(post.comments || []),
                    newComment,
                  ] as Model.Comment[],
                }
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

  const fetchLikedUsers = async (postId: string) => {
    try {
      const post = posts.find(post => post.id === postId)
      if (post) {
        const userIds = post.likes?.map(like => like.userId) || []
        const users = await Promise.all(userIds.map(id => Api.User.findOne(id)))
        setLikedUsers(users)
      }
    } catch {
      enqueueSnackbar('Failed to fetch liked users', { variant: 'error' })
    }
  }

  const handleShowLikesModal = async (postId: string) => {
    await fetchLikedUsers(postId)
    setIsModalVisible(true)
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
                  key={`like-${post.id}`}
                >
                  {post.likes?.length || 0}
                </Button>,
                <Button
                  type="link"
                  icon={<LikeOutlined />}
                  onClick={() => handleShowLikesModal(post.id)}
                  key={`show-likes-${post.id}`}
                >
                  Show Likes
                </Button>,
                <Button
                  key={`comment-${post.id}`}
                  type="link"
                  icon={<CommentOutlined />}
                >
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
      <Modal
        title="Users who liked this post"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={likedUsers}
          renderItem={user => (
            <List.Item key={user.id}>
              <List.Item.Meta
                avatar={<Avatar src={user.pictureUrl} />}
                title={<a onClick={() => router.push(`/users/${user.id}`)}>{user.name}</a>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </PageLayout>
  )
}
