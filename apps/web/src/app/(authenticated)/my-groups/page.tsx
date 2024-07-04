'use client'

import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import { Api } from '@web/domain';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function MyGroups() {
  const [groups, setGroups] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups: any[] = await Api.Group.findMany();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = (groupId: string) => {
    router.push(`/groups/${groupId}`);
  };

  return (
    <div>
      <Title level={2}>My Groups</Title>
      <List
        itemLayout="horizontal"
        dataSource={groups}
        renderItem={(group: any) => (
          <List.Item onClick={() => handleGroupClick(group.id)}>
            <List.Item.Meta
              title={group.name}
              description={group.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
