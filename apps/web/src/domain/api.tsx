import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { PostDataApi } from './postData/postData.api'

import { LikeApi } from './like/like.api'

import { CommentApi } from './comment/comment.api'

import { GroupApi } from './group/group.api'

import { GroupMemberApi } from './groupMember/groupMember.api'

import { GroupPostApi } from './groupPost/groupPost.api'

import { GroupPostLikeApi } from './groupPostLike/groupPostLike.api'

import { GroupPostCommentApi } from './groupPostComment/groupPostComment.api'

import { DirectMessageApi } from './directMessage/directMessage.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class PostData extends PostDataApi {}

  export class Like extends LikeApi {}

  export class Comment extends CommentApi {}

  export class Group extends GroupApi {}

  export class GroupMember extends GroupMemberApi {}

  export class GroupPost extends GroupPostApi {}

  export class GroupPostLike extends GroupPostLikeApi {}

  export class GroupPostComment extends GroupPostCommentApi {}

  export class DirectMessage extends DirectMessageApi {}
}
