import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { PostData as PostDataModel } from './postData/postData.model'

import { Like as LikeModel } from './like/like.model'

import { Comment as CommentModel } from './comment/comment.model'

import { Group as GroupModel } from './group/group.model'

import { GroupMember as GroupMemberModel } from './groupMember/groupMember.model'

import { GroupPost as GroupPostModel } from './groupPost/groupPost.model'

import { GroupPostLike as GroupPostLikeModel } from './groupPostLike/groupPostLike.model'

import { GroupPostComment as GroupPostCommentModel } from './groupPostComment/groupPostComment.model'

import { DirectMessage as DirectMessageModel } from './directMessage/directMessage.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class PostData extends PostDataModel {}

  export class Like extends LikeModel {}

  export class Comment extends CommentModel {}

  export class Group extends GroupModel {}

  export class GroupMember extends GroupMemberModel {}

  export class GroupPost extends GroupPostModel {}

  export class GroupPostLike extends GroupPostLikeModel {}

  export class GroupPostComment extends GroupPostCommentModel {}

  export class DirectMessage extends DirectMessageModel {}
}
