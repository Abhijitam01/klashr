import { GroupMember } from '../groupMember'

import { GroupPost } from '../groupPost'

export class Group {
  id: string

  name: string

  description?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  groupMembers?: GroupMember[]

  groupPosts?: GroupPost[]
}
