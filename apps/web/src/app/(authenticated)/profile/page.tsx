'use client'

import { Avatar, Button, Flex, Typography, Select } from 'antd'
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
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const hobbies = await Api.Like.findManyByUserId(user.id)
        setHobbies(hobbies)
        setSelectedHobbies(hobbies.map(hobby => hobby.id))
      } catch (error) {
        enqueueSnackbar('Could not fetch hobbies', { variant: 'error' })
      }
    }

    fetchHobbies()
  }, [user.id, enqueueSnackbar])

  const handleSubmit = async (values: Partial<Model.User>) => {
    setLoading(true)

    try {
      const { hobbies, ...restValues } = values
      const userUpdated = await Api.User.updateOne(user.id, {
        ...restValues,
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

      <div style={{ marginTop: '20px' }}>
        <Title level={4}>Hobbies</Title>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select your hobbies"
          value={selectedHobbies}
          onChange={handleHobbiesChange}
        >
          {hobbies.map(hobby => (
            <Option key={hobby.id} value={hobby.id}>
              {hobby.id}
            </Option>
          ))}
        </Select>
      </div>
    </PageLayout>
  )
}
