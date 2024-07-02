'use client'

import { useEffect, useState } from 'react'
import { Typography, Form, Input, Button, List, Avatar, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MyProfilePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [user, setUser] = useState<Model.User | null>(null)
  const [followers, setFollowers] = useState<Model.User[]>([])
  const [following, setFollowing] = useState<Model.User[]>([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['groupMembers.user'] })
        .then(setUser)
        .catch(() =>
          enqueueSnackbar('Failed to fetch user data', { variant: 'error' }),
        )

      // Fetch followers and following (assuming these endpoints exist)
      Api.User.findOne(userId, { includes: ['groupMembers.user'] })
        .then(user => {
          setFollowers(user.groupMembers?.map(gm => gm.user) || [])
          setFollowing(user.groupMembers?.map(gm => gm.user) || [])
        })
        .catch(() =>
          enqueueSnackbar('Failed to fetch followers/following', {
            variant: 'error',
          }),
        )
    }
  }, [userId])

  const handleUpdateProfile = (values: Partial<Model.User>) => {
    if (userId) {
      Api.User.updateOne(userId, values)
        .then(updatedUser => {
          setUser(updatedUser)
          enqueueSnackbar('Profile updated successfully', {
            variant: 'success',
          })
        })
        .catch(() =>
          enqueueSnackbar('Failed to update profile', { variant: 'error' }),
        )
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Profile</Title>
      <Text>Manage your profile information and connections.</Text>

      {user && (
        <Form
          layout="vertical"
          initialValues={user}
          onFinish={handleUpdateProfile}
          style={{ marginTop: 20 }}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      )}

      <Row gutter={16} style={{ marginTop: 40 }}>
        <Col span={12}>
          <Title level={4}>Followers</Title>
          <List
            itemLayout="horizontal"
            dataSource={followers}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar icon={<UserOutlined />} src={item.pictureUrl} />
                  }
                  title={item.name}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Title level={4}>Following</Title>
          <List
            itemLayout="horizontal"
            dataSource={following}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar icon={<UserOutlined />} src={item.pictureUrl} />
                  }
                  title={item.name}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PageLayout>
  )
}
