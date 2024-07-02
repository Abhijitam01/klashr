import { Group } from '../group'

import { User } from '../user'

import { GroupPostLike } from '../groupPostLike'

import { GroupPostComment } from '../groupPostComment'

export class GroupPost {
  id: string

  content: string

  groupId: string

  group?: Group

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  groupPostLikes?: GroupPostLike[]

  groupPostComments?: GroupPostComment[]
}
