'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Avatar, List, Space } from 'antd'
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UserProfilePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [userProfile, setUserProfile] = useState<Model.User | null>(null)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await Api.User.findOne(params.userId, {
          includes: ['posts'],
        })
        setUserProfile(user)
        // Check if the current user is following the profile user
        // Assuming there's an API endpoint to check following status
        // setIsFollowing(await Api.User.isFollowing(userId, params.userId))
      } catch (error) {
        enqueueSnackbar('Failed to fetch user profile', { variant: 'error' })
      }
    }

    fetchUserProfile()
  }, [params.userId])

  const handleFollow = async () => {
    try {
      // Assuming there's an API endpoint to follow a user
      // await Api.User.follow(userId, params.userId)
      setIsFollowing(true)
      enqueueSnackbar('Successfully followed the user', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to follow the user', { variant: 'error' })
    }
  }

  const handleUnfollow = async () => {
    try {
      // Assuming there's an API endpoint to unfollow a user
      // await Api.User.unfollow(userId, params.userId)
      setIsFollowing(false)
      enqueueSnackbar('Successfully unfollowed the user', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to unfollow the user', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>User Profile</Title>
      <Paragraph>
        View and interact with user profiles and their posts.
      </Paragraph>
      {userProfile && (
        <div style={{ textAlign: 'center' }}>
          <Avatar size={64} src={userProfile.pictureUrl} />
          <Title level={3}>{userProfile.name}</Title>
          {userId === userProfile.id ? (
            <Text>{userProfile.email}</Text>
          ) : null}
          <br />
          <Button
            type="primary"
            icon={isFollowing ? <UserDeleteOutlined /> : <UserAddOutlined />}
            onClick={isFollowing ? handleUnfollow : handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          <Title level={4} style={{ marginTop: '20px' }}>
            Posts
          </Title>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={userProfile.posts}
            renderItem={post => (
              <List.Item key={post.id}>
                <List.Item.Meta
                  title={
                    <a href={`/posts/${post.id}`}>
                      {dayjs(post.dateCreated).format('MMMM D, YYYY')}
                    </a>
                  }
                  description={post.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </PageLayout>
  )
}
