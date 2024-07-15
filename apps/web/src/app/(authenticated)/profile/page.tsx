'use client'

import { RouterObject } from '@web/core/router'
import { Api, Model } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { PageLayout } from '@web/layouts/Page.layout'
import { Utility } from '@web/libraries/utility'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Input, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { UserForm } from './components/userForm'

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
  const [hobbies, setHobbies] = useState<Model.Like[]>([])
  const [selectedHobbies, setSelectedHobbies] = useState<Model.Like[]>([])
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
  const [newHobby, setNewHobby] = useState<string>('')

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const hobbies = await Api.Like.findManyByUserId(user.id)
        setHobbies(hobbies)
        setSelectedHobbies(hobbies)
      } catch (error) {
        enqueueSnackbar('Could not fetch hobbies', { variant: 'error' })
      }
    }

    const fetchLastUpdateTime = async () => {
      try {
        const user = await Api.User.findMe()
        setLastUpdateTime(new Date(user.dateUpdated))
      } catch (error) {
        enqueueSnackbar('Could not fetch last update time', {
          variant: 'error',
        })
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
        likes: selectedHobbies.map(hobby => hobby.id),
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
    const selected = hobbies.filter(hobby => value.includes(hobby.id))
    setSelectedHobbies(selected)
  }

  const handleAddHobby = async () => {
    if (!newHobby.trim()) return

    try {
      const createdHobby = await Api.Like.createOneByUserId(user.id, {
        id: newHobby,
        userId: user.id,
        postId: '',
      }) // Assuming postId is required but not provided
      setHobbies(prevHobbies => [...prevHobbies, createdHobby])
      setSelectedHobbies(prevHobbies => [...prevHobbies, createdHobby])
      setNewHobby('')
      await Api.User.updateOne(user.id, {
        likes: [...selectedHobbies, createdHobby].map(hobby => hobby.id),
      })
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={1}>Profile</Title>
        <Button onClick={handleClickLogout} loading={isLoadingLogout}>
          Logout
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        <Avatar size={80} src={user?.pictureUrl}>
          {userInitials}
        </Avatar>
      </div>

      <UserForm
        user={user}
        isLoading={isLoading}
        isDisabled={isLoadingLogout}
        onSubmit={handleSubmit}
      />

      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select hobbies"
          value={selectedHobbies.map(hobby => hobby.id)}
          onChange={handleHobbiesChange}
        >
          {hobbies.map(hobby => (
            <Option key={hobby.id} value={hobby.id}>
              {hobby.id}
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
        <Button
          onClick={() =>
            handleSubmit({ likes: selectedHobbies.map(hobby => hobby.id) })
          }
          style={{ marginTop: '20px' }}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </PageLayout>
  )
}
