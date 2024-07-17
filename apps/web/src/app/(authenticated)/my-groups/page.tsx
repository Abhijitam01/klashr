'use client'

import { Api, Model } from '@web/domain'
import { Button, List, Typography, message } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

export default function MyGroupsPage() {
  const [groups, setGroups] = useState<Model.GroupMember[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const userId = 'currentUserId' // Replace with actual user ID

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groupMembers = await Api.GroupMember.findManyByUserId(userId)
        setGroups(groupMembers)
      } catch (error) {
        message.error('Failed to fetch groups')
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [userId])

  const handleDirectMessage = async (groupId: string) => {
    try {
      const newMessage = await Api.DirectMessage.createOneBySenderId(userId, {
        content: 'Hello!',
        receiverId: groupId,
      })
      router.push(`/messages/${userId}`)
    } catch (error) {
      message.error('Failed to send message')
    }
  }

  return (
    <div>
      <Title level={2}>My Groups</Title>
      <Text>You have joined {groups.length} groups.</Text>
      <List
        loading={loading}
        dataSource={groups}
        renderItem={groupMember => (
          <List.Item
            actions={[
              <Button
                key={`direct-message-${groupMember.id}`}
                type="primary"
                onClick={() => handleDirectMessage(groupMember.groupId)}
              >
                Message Group
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={groupMember.group?.name}
              description={groupMember.group?.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
