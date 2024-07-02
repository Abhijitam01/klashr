import { User } from '../user'

export class DirectMessage {
  id: string

  content: string

  senderId: string

  sender?: User

  receiverId: string

  receiver?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
