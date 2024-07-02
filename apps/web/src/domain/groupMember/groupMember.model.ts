import { Group } from '../group'

import { User } from '../user'

export class GroupMember {
  id: string

  groupId: string

  group?: Group

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
