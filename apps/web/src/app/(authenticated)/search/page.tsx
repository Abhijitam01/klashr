'use client'

import { useState } from 'react'
import { Input, List, Avatar, Typography, Row, Col, Spin, Empty } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
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
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Model.User[]>([])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const usersFound = await Api.User.findMany({
        filters: { name: { ilike: `%${searchTerm}%` } },
        includes: ['groupMembers', 'posts'],
      })
      setUsers(usersFound)
    } catch (error) {
      enqueueSnackbar('Error fetching users', { variant: 'error' })
    } finally {
      setLoading(false)
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
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
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
                    description={user.email}
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
