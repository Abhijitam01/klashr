import { User } from '../user'

import { GroupPost } from '../groupPost'

export class GroupPostLike {
  id: string

  userId: string

  user?: User

  groupPostId: string

  groupPost?: GroupPost

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
