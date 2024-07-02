import { User } from '../user'

import { Like } from '../like'

import { Comment } from '../comment'

export class PostData {
  id: string

  content: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  likes?: Like[]

  comments?: Comment[]
}
