'use client'

import { useState, useEffect } from 'react'
import { Typography, Button, List, Avatar, Input, Space, Tooltip } from 'antd'
import { LikeOutlined, LikeFilled, MessageOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GroupDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [group, setGroup] = useState<Model.Group | null>(null)
  const [isMember, setIsMember] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupData = await Api.Group.findOne(params.groupId, {
          includes: [
            'groupMembers.user',
            'groupPosts.groupPostLikes',
            'groupPosts.groupPostComments.user',
          ],
        })
        setGroup(groupData)
        setIsMember(
          groupData.groupMembers?.some(member => member.userId === userId) ??
            false,
        )
      } catch (error) {
        enqueueSnackbar('Failed to load group details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchGroupDetails()
  }, [params.groupId, userId])

  const handleJoinGroup = async () => {
    try {
      await Api.GroupMember.createOneByGroupId(params.groupId, { userId })
      setIsMember(true)
      enqueueSnackbar('Successfully joined the group', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to join the group', { variant: 'error' })
    }
  }

  const handleLeaveGroup = async () => {
    try {
      const groupMember = group?.groupMembers?.find(
        member => member.userId === userId,
      )
      if (groupMember) {
        await Api.GroupMember.deleteOne(groupMember.id)
        setIsMember(false)
        enqueueSnackbar('Successfully left the group', { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar('Failed to leave the group', { variant: 'error' })
    }
  }

  const handleCreatePost = async () => {
    try {
      await Api.GroupPost.createOneByUserId(userId, {
        content: newPostContent,
        groupId: params.groupId,
      })
      setNewPostContent('')
      enqueueSnackbar('Post created successfully', { variant: 'success' })
      // Refresh group details to show the new post
      const groupData = await Api.Group.findOne(params.groupId, {
        includes: [
          'groupMembers.user',
          'groupPosts.groupPostLikes',
          'groupPosts.groupPostComments.user',
        ],
      })
      setGroup(groupData)
    } catch (error) {
      enqueueSnackbar('Failed to create post', { variant: 'error' })
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      await Api.GroupPostLike.createOneByUserId(userId, { groupPostId: postId })
      enqueueSnackbar('Post liked', { variant: 'success' })
      // Refresh group details to show the new like
      const groupData = await Api.Group.findOne(params.groupId, {
        includes: [
          'groupMembers.user',
          'groupPosts.groupPostLikes',
          'groupPosts.groupPostComments.user',
        ],
      })
      setGroup(groupData)
    } catch (error) {
      enqueueSnackbar('Failed to like post', { variant: 'error' })
    }
  }

  if (loading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>{group?.name}</Title>
      <Paragraph>{group?.description}</Paragraph>
      <Space>
        {isMember ? (
          <Button type="primary" danger onClick={handleLeaveGroup}>
            Leave Group
          </Button>
        ) : (
          <Button type="primary" onClick={handleJoinGroup}>
            Join Group
          </Button>
        )}
      </Space>
      {isMember && (
        <div style={{ marginTop: '20px' }}>
          <Title level={3}>Create a Post</Title>
          <TextArea
            rows={4}
            value={newPostContent}
            onChange={e => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <Button
            type="primary"
            onClick={handleCreatePost}
            style={{ marginTop: '10px' }}
          >
            Post
          </Button>
        </div>
      )}
      <Title level={3} style={{ marginTop: '40px' }}>
        Posts
      </Title>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={group?.groupPosts}
        renderItem={post => (
          <List.Item
            key={post.id}
            actions={[
              <Tooltip key="like" title="Like">
                <span onClick={() => handleLikePost(post.id)}>
                  {post.groupPostLikes?.some(like => like.userId === userId) ? (
                    <LikeFilled />
                  ) : (
                    <LikeOutlined />
                  )}
                  <span className="comment-action">
                    {post.groupPostLikes?.length}
                  </span>
                </span>
              </Tooltip>,
              <Tooltip key="comment" title="Comment">
                <span>
                  <MessageOutlined />
                  <span className="comment-action">
                    {post.groupPostComments?.length}
                  </span>
                </span>
              </Tooltip>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={post.user?.pictureUrl} />}
              title={post.user?.name}
              description={dayjs(post.dateCreated).format(
                'MMMM D, YYYY h:mm A',
              )}
            />
            {post.content}
            <List
              itemLayout="horizontal"
              dataSource={post.groupPostComments}
              renderItem={comment => (
                <li key={comment.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={comment.user?.pictureUrl} />}
                    title={comment.user?.name}
                    description={dayjs(comment.dateCreated).format(
                      'MMMM D, YYYY h:mm A',
                    )}
                  />
                  <div>{comment.content}</div>
                </li>
              )}
            />
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
