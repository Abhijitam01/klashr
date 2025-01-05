import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model';
import { BillingPayment as BillingPaymentModel, BillingProduct as BillingProductModel, BillingSubscription as BillingSubscriptionModel, } from './billing/billing.model';
import { User as UserModel } from './user/user.model';
import { Notification as NotificationModel } from './notification/notification.model';
import { PostData as PostDataModel } from './postData/postData.model';
import { Like as LikeModel } from './like/like.model';
import { Comment as CommentModel } from './comment/comment.model';
import { Group as GroupModel } from './group/group.model';
import { GroupMember as GroupMemberModel } from './groupMember/groupMember.model';
import { GroupPost as GroupPostModel } from './groupPost/groupPost.model';
import { GroupPostLike as GroupPostLikeModel } from './groupPostLike/groupPostLike.model';
import { GroupPostComment as GroupPostCommentModel } from './groupPostComment/groupPostComment.model';
import { DirectMessage as DirectMessageModel } from './directMessage/directMessage.model';
export var Model;
(function (Model) {
    class AuthorizationRole extends AuthorizationRoleModel {
    }
    Model.AuthorizationRole = AuthorizationRole;
    class BillingProduct extends BillingProductModel {
    }
    Model.BillingProduct = BillingProduct;
    class BillingPayment extends BillingPaymentModel {
    }
    Model.BillingPayment = BillingPayment;
    class BillingSubscription extends BillingSubscriptionModel {
    }
    Model.BillingSubscription = BillingSubscription;
    class User extends UserModel {
    }
    Model.User = User;
    class Notification extends NotificationModel {
    }
    Model.Notification = Notification;
    class PostData extends PostDataModel {
    }
    Model.PostData = PostData;
    class Like extends LikeModel {
    }
    Model.Like = Like;
    class Comment extends CommentModel {
    }
    Model.Comment = Comment;
    class Group extends GroupModel {
    }
    Model.Group = Group;
    class GroupMember extends GroupMemberModel {
    }
    Model.GroupMember = GroupMember;
    class GroupPost extends GroupPostModel {
    }
    Model.GroupPost = GroupPost;
    class GroupPostLike extends GroupPostLikeModel {
    }
    Model.GroupPostLike = GroupPostLike;
    class GroupPostComment extends GroupPostCommentModel {
    }
    Model.GroupPostComment = GroupPostComment;
    class DirectMessage extends DirectMessageModel {
    }
    Model.DirectMessage = DirectMessage;
})(Model || (Model = {}));
