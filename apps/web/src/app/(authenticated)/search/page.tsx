'use client'

import { useState } from 'react'
import { Input, List, Avatar, Typography, Row, Col, Spin, Empty, Select, Button, Slider } from 'antd'
import { SearchOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SearchPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [hobbies, setHobbies] = useState<string[]>([])
  const [range, setRange] = useState<[number, number]>([0, 50])
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Model.User[]>([])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const usersFound = await Api.User.findMany({
        filters: {
          name: { ilike: `%${searchTerm}%` }
        },
        includes: ['groupMembers', 'posts'],
      })
      setUsers(usersFound)
    } catch (error) {
      enqueueSnackbar('Error fetching users', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async (followedUserId: string) => {
    try {
      // Create notification for the followed user
      await Api.Notification.createOne({
        userId: followedUserId,
        title: 'New Follow Request',
        message: `You have a new follow request from ${authentication.user?.name}`,
        senderName: authentication.user?.name,
        senderEmail: authentication.user?.email,
        senderPictureUrl: authentication.user?.pictureUrl,
        redirectUrl: `/users/${userId}`,
        dateCreated: dayjs().toISOString()
      })

      // Create notification for the following user
      await Api.Notification.createOne({
        userId: userId!,
        title: 'Follow Request Sent',
        message: `Your follow request to ${followedUserId} has been sent.`,
        dateCreated: dayjs().toISOString()
      })

      enqueueSnackbar('Follow request sent', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error sending follow request', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={2}>Search Users</Title>
          <Text>Find people in your area with similar interests.</Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Input
            placeholder="Search by user"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Select
            mode="multiple"
            placeholder="Select hobbies"
            value={hobbies}
            onChange={value => setHobbies(value)}
            style={{ width: '100%' }}
          >
            <Select.Option value="reading">Reading</Select.Option>
            <Select.Option value="sports">Sports</Select.Option>
            <Select.Option value="music">Music</Select.Option>
            <Select.Option value="traveling">Traveling</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Slider
            range
            min={0}
            max={100}
            value={range}
            onChange={value => setRange(value as [number, number])}
            tooltipVisible
          />
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()} />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          {loading ? (
            <Spin tip="Loading..." />
          ) : users.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={user => (
                <List.Item
                  actions={[
                    <a
                      key="view"
                      onClick={() => router.push(`/users/${user.id}`)}
                    >
                      View Profile
                    </a>,
                    <Button key="follow" type="primary" onClick={() => handleFollow(user.id)}>
                      Follow
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={user.pictureUrl}
                        icon={!user.pictureUrl && <UserOutlined />}
                      />
                    }
                    title={user.name}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No users found" />
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
