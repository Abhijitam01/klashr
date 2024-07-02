import { User } from '../user'

import { GroupPost } from '../groupPost'

export class GroupPostComment {
  id: string

  content: string

  userId: string

  user?: User

  groupPostId: string

  groupPost?: GroupPost

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
