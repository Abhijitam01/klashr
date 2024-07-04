'use client'

import { useEffect, useState } from 'react'
import { Flex, Typography, Button } from 'antd'

import { useHttpAction } from '@web/core/http/http.action.hook'
import { useCoreStore } from '@web/core/store'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useNotificationToast } from '@web/modules/notification/components'
import { Actions } from './components/Actions'
import { NotificationList } from './components/NotificationList'

const { Title } = Typography

export default function NotificationsPage() {
  const { notifications, setNotifications } = useCoreStore()
  const [followersCount, setFollowersCount] = useState(0)
  const [followRequestsCount, setFollowRequestsCount] = useState(0)

  const notificationToast = useNotificationToast()
  const actionClearAll = useHttpAction()
  const actionFollowBack = useHttpAction()

  useEffect(() => {
    Api.User.findMe().then(user => {
      setFollowersCount(user.followers?.length || 0)
      setFollowRequestsCount(user.followRequests?.length || 0)
    })
  }, [])

  const handleClearAll = () => {
    actionClearAll.run(() =>
      Api.Notification.deleteAllByMe().then(() => setNotifications([])),
    )
  }

  const handleFollowBack = (userId: string) => {
    actionFollowBack.run(() =>
      Api.User.followBack(userId).then(() => {
        setFollowRequestsCount(prevCount => prevCount - 1)
        setFollowersCount(prevCount => prevCount + 1)
      }),
    )
  }

  const canClearAll = notifications.length > 0

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Title level={1}>Notifications</Title>
        <Actions
          canClearAll={canClearAll}
          isLoadingClearAll={actionClearAll.isLoading}
          onClearAll={handleClearAll}
        />
      </Flex>

      <Flex justify="space-between" align="center" style={{ marginBottom: '1rem' }}>
        <div>
          <Title level={4}>Followers: {followersCount}</Title>
          <Title level={4}>Follow Requests: {followRequestsCount}</Title>
        </div>
        <Button
          type="primary"
          onClick={() => handleFollowBack('user-id')} // Replace 'user-id' with actual user ID
          loading={actionFollowBack.isLoading}
        >
          Accept and Follow Back
        </Button>
      </Flex>

      <NotificationList
        notifications={notifications}
        onClick={notificationToast.onClick}
        onDelete={notificationToast.onDelete}
      />
    </PageLayout>
  )
}
