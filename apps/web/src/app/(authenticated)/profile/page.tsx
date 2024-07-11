'use client'

import { Avatar, Button, Flex, Typography, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { RouterObject } from '@web/core/router'
import { Api, Model } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { PageLayout } from '@web/layouts/Page.layout'
import { Utility } from '@web/libraries/utility'
import { useAuthentication } from '@web/modules/authentication'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { UserForm } from './components/userForm'
import dayjs from 'dayjs'

const { Title } = Typography
const { Option } = Select

export default function ProfilePage() {
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { removeToken } = AuthenticationHook.useToken()

  const user = authentication.user as Model.User
  const userInitials = Utility.stringToInitials(user.name)

  const [isLoading, setLoading] = useState(false)
  const [isLoadingLogout, setLoadingLogout] = useState(false)
  const [hobbies, setHobbies] = useState<string[]>([])
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
  const [newHobby, setNewHobby] = useState<string>('')

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const hobbies = await Api.Like.findManyByUserId(user.id)
        setHobbies(hobbies.map(hobby => hobby.id))
        setSelectedHobbies(hobbies.map(hobby => hobby.id))
      } catch (error) {
        enqueueSnackbar('Could not fetch hobbies', { variant: 'error' })
      }
    }

    const fetchLastUpdateTime = async () => {
      try {
        const user = await Api.User.findMe()
        setLastUpdateTime(new Date(user.dateUpdated))
      } catch (error) {
        enqueueSnackbar('Could not fetch last update time', { variant: 'error' })
      }
    }

    fetchHobbies()
    fetchLastUpdateTime()
  }, [user.id, enqueueSnackbar])

  const handleSubmit = async (userData: Partial<Model.User>) => {
    setLoading(true)

    try {
      const userUpdated = await Api.User.updateOne(user.id, {
        ...userData,
        likes: selectedHobbies
      })
      authentication.setUser(userUpdated)
    } catch (error) {
      enqueueSnackbar('Could not save information', { variant: 'error' })
    }

    setLoading(false)
  }

  const handleClickLogout = async () => {
    setLoadingLogout(true)

    try {
      await Api.Authentication.logout(document)

      removeToken()

      authentication.logout()

      router.push(RouterObject.route.LOGIN)
    } catch (error) {
      enqueueSnackbar('Could not logout', { variant: 'error' })
      setLoadingLogout(false)
    }
  }

  const handleHobbiesChange = (value: string[]) => {
    setSelectedHobbies(value)
  }

  const handleAddHobby = async () => {
    if (!newHobby.trim()) return

    try {
      const createdHobby = await Api.Like.createOneByUserId(user.id, { id: newHobby, userId: user.id, postId: '' }) // Assuming postId is required but not provided
      setHobbies(prevHobbies => [...prevHobbies, createdHobby.id])
      setSelectedHobbies(prevHobbies => [...prevHobbies, createdHobby.id])
      setNewHobby('')
      await Api.User.updateOne(user.id, { likes: [...selectedHobbies, createdHobby.id] })
      setLastUpdateTime(new Date())
    } catch (error) {
      enqueueSnackbar('Could not add new hobby', { variant: 'error' })
    }
  }

  const is24HoursPassed = () => {
    if (!lastUpdateTime) return true
    const now = dayjs()
    const lastUpdate = dayjs(lastUpdateTime)
    return now.diff(lastUpdate, 'hour') >= 24
  }

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Title level={1}>Profile</Title>
        <Button onClick={handleClickLogout} loading={isLoadingLogout}>
          Logout
        </Button>
      </Flex>

      <Flex justify="center" style={{ marginBottom: '30px' }}>
        <Avatar size={80} src={user?.pictureUrl}>
          {userInitials}
        </Avatar>
      </Flex>

      <UserForm
        user={user}
        isLoading={isLoading}
        isDisabled={isLoadingLogout}
        onSubmit={handleSubmit}
      />

      <Flex direction="column" style={{ marginTop: '20px' }}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select hobbies"
          value={selectedHobbies}
          onChange={handleHobbiesChange}
        >
          {hobbies.map(hobby => (
            <Option key={hobby} value={hobby}>
              {hobby}
            </Option>
          ))}
        </Select>
        <Input
          style={{ marginTop: '10px' }}
          placeholder="Add new hobby"
          value={newHobby}
          onChange={e => setNewHobby(e.target.value)}
        />
        <Button onClick={handleAddHobby} style={{ marginTop: '10px' }}>
          Add Hobby
        </Button>
        <Button onClick={() => handleSubmit({ likes: selectedHobbies })} style={{ marginTop: '20px' }} loading={isLoading}>
          Save
        </Button>
      </Flex>
    </PageLayout>
  )
}
