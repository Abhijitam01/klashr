'use client'

import { RouterObject } from '@web/core/router'
import { Api, Model } from '@web/domain'
import { AuthenticationHook } from '@web/domain/authentication'
import { PageLayout } from '@web/layouts/Page.layout'
import { Utility } from '@web/libraries/utility'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Input, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { UserForm } from './components/userForm'

const { Title } = Typography

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
        likes: selectedHobbies, // This needs to be an array of Like objects, not IDs
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
        likes: [...selectedHobbies, createdHobby],
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

      <div style={{ marginTop: '20px' }}>
        <Title level={2}>Hobbies</Title>
        <Input
          style={{ marginTop: '10px' }}
          placeholder="Add new hobby"
          value={newHobby}
          onChange={e => setNewHobby(e.target.value)}
        />
        <Button onClick={handleAddHobby} style={{ marginTop: '10px' }}>
          Add Hobby
        </Button>
        <div style={{ marginTop: '20px' }}>
          {selectedHobbies.map(hobby => (
            <div key={hobby.id}>{hobby.id}</div>
          ))}
        </div>
        <Button
          onClick={() => handleSubmit({ likes: selectedHobbies })}
          style={{ marginTop: '20px' }}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </PageLayout>
  )
}
