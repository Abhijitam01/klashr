'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  Form,
  Input,
  List,
  Card,
  Row,
  Col,
  Modal,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GroupsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [groups, setGroups] = useState<Model.Group[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsFound = await Api.Group.findMany({
          includes: ['groupMembers', 'groupMembers.user'],
        })
        setGroups(groupsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch groups', { variant: 'error' })
      }
    }

    fetchGroups()
  }, [])

  const handleCreateGroup = async (values: Partial<Model.Group>) => {
    try {
      await Api.Group.createOne(values)
      enqueueSnackbar('Group created successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      const groupsFound = await Api.Group.findMany({
        includes: ['groupMembers', 'groupMembers.user'],
      })
      setGroups(groupsFound)
    } catch (error) {
      enqueueSnackbar('Failed to create group', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Groups</Title>
      <Paragraph>
        As a user, you can view a list of groups and create new groups to
        connect with like-minded people in your area.
      </Paragraph>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Create New Group
      </Button>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={groups}
        renderItem={group => (
          <List.Item>
            <Card
              title={group.name}
              onClick={() => router.push(`/groups/${group.id}`)}
            >
              <p>{group.description}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Create New Group"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateGroup}>
          <Form.Item
            name="name"
            label="Group Name"
            rules={[
              { required: true, message: 'Please input the group name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
