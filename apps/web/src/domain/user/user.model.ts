import { Notification } from '../notification'

import { PostData } from '../postData'

import { Like } from '../like'

import { Comment } from '../comment'

import { GroupMember } from '../groupMember'

import { GroupPost } from '../groupPost'

import { GroupPostLike } from '../groupPostLike'

import { GroupPostComment } from '../groupPostComment'

import { DirectMessage } from '../directMessage'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  posts?: PostData[]

  likes?: Like[]

  comments?: Comment[]

  groupMembers?: GroupMember[]

  groupPosts?: GroupPost[]

  groupPostLikes?: GroupPostLike[]

  groupPostComments?: GroupPostComment[]

  directMessagesAsSender?: DirectMessage[]

  directMessagesAsReceiver?: DirectMessage[]
}
