import { User } from '../user'

import { PostData } from '../postData'

export class Like {
  id: string

  userId: string

  user?: User

  postId: string

  post?: PostData

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
