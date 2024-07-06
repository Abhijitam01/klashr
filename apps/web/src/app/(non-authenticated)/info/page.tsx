'use client'

import React from 'react';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { Api } from '@web/domain';

export default function InfoPage() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await Api.PostData.updateOne('postDataId', values);
      router.push('/next-page'); // Replace with the actual path of the next page
    } catch (error) {
      console.error('Failed to update post data:', error);
    }
  };

  return (
    <Form
      name="user_info"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[{ required: true, message: 'Please input your age!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Hobbies"
        name="hobbies"
        rules={[{ required: true, message: 'Please input your hobbies!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="What they love to do"
        name="loveToDo"
        rules={[{ required: true, message: 'Please input what you love to do!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Profession"
        name="profession"
        rules={[{ required: true, message: 'Please input your profession!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Favorite Food"
        name="favoriteFood"
        rules={[{ required: true, message: 'Please input your favorite food!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Preferred Travel Destinations"
        name="travelDestinations"
        rules={[{ required: true, message: 'Please input your preferred travel destinations!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
