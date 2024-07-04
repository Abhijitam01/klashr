'use client'

import { useEffect, useState } from 'react'
import { Typography, Input, Button, List, Avatar, Row, Col } from 'antd'
import { SendOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function DirectMessagesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [messages, setMessages] = useState<Model.DirectMessage[]>([])
  const [messageContent, setMessageContent] = useState('')
  const [receiver, setReceiver] = useState<Model.User | null>(null)

  useEffect(() => {
    if (userId && params.userId) {
      fetchMessages()
      fetchReceiver()
    }
  }, [userId, params.userId])

  const fetchMessages = async () => {
    try {
      const user = await Api.User.findOne(userId, {
        includes: [
          'directMessagesAsSender.sender',
          'directMessagesAsSender.receiver',
          'directMessagesAsReceiver.sender',
          'directMessagesAsReceiver.receiver',
        ],
      })
      const allMessages = [
        ...(user.directMessagesAsSender || []),
        ...(user.directMessagesAsReceiver || []),
      ].filter(
        dm => dm.senderId === params.userId || dm.receiverId === params.userId,
      )
      setMessages(allMessages)
    } catch (error) {
      enqueueSnackbar('Failed to fetch messages', { variant: 'error' })
    }
  }

  const fetchReceiver = async () => {
    try {
      const user = await Api.User.findOne(params.userId)
      setReceiver(user)
    } catch (error) {
      enqueueSnackbar('Failed to fetch receiver', { variant: 'error' })
    }
  }

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      enqueueSnackbar('Message content cannot be empty', { variant: 'error' })
      return
    }

    try {
      const newMessage = await Api.DirectMessage.createOneBySenderId(userId, {
        content: messageContent,
        receiverId: params.userId,
      })
      setMessages([...messages, newMessage])
      setMessageContent('')
      enqueueSnackbar('Message sent successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  const handleUserClick = (userId: string) => {
    router.push(`/messages/${userId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Row
        justify="center"
        align="middle"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col>
          <Title level={2}>Direct Messages</Title>
          <Text>Private conversation with {receiver?.name || 'User'}</Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={message => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={message.sender?.pictureUrl} />}
                  title={message.senderId === userId ? 'You' : message.sender?.name}
                  description={message.content}
                />
                <Text type="secondary">
                  {dayjs(message.dateCreated).format('DD/MM/YYYY HH:mm')}
                </Text>
              </List.Item>
            )}
          />
          <Row justify="center" align="middle" style={{ marginTop: '20px' }}>
            <Col span={24}>
              <TextArea
                rows={4}
                value={messageContent}
                onChange={e => setMessageContent(e.target.value)}
                placeholder="Type your message here..."
              />
            </Col>
            <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageLayout>
  )
}
