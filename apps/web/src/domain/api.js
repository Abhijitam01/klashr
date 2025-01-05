import { AiApi } from './ai/ai.api';
import { AuthenticationApi } from './authentication/authentication.api';
import { AuthorizationApi } from './authorization/authorization.api';
import { BillingApi } from './billing/billing.api';
import { UploadApi } from './upload/upload.api';
import { UserApi } from './user/user.api';
import { NotificationApi } from './notification/notification.api';
import { PostDataApi } from './postData/postData.api';
import { LikeApi } from './like/like.api';
import { CommentApi } from './comment/comment.api';
import { GroupApi } from './group/group.api';
import { GroupMemberApi } from './groupMember/groupMember.api';
import { GroupPostApi } from './groupPost/groupPost.api';
import { GroupPostLikeApi } from './groupPostLike/groupPostLike.api';
import { GroupPostCommentApi } from './groupPostComment/groupPostComment.api';
import { DirectMessageApi } from './directMessage/directMessage.api';
export var Api;
(function (Api) {
    class Ai extends AiApi {
    }
    Api.Ai = Ai;
    class Authentication extends AuthenticationApi {
    }
    Api.Authentication = Authentication;
    class Authorization extends AuthorizationApi {
    }
    Api.Authorization = Authorization;
    class Billing extends BillingApi {
    }
    Api.Billing = Billing;
    class Upload extends UploadApi {
    }
    Api.Upload = Upload;
    class User extends UserApi {
    }
    Api.User = User;
    class Notification extends NotificationApi {
    }
    Api.Notification = Notification;
    class PostData extends PostDataApi {
    }
    Api.PostData = PostData;
    class Like extends LikeApi {
    }
    Api.Like = Like;
    class Comment extends CommentApi {
    }
    Api.Comment = Comment;
    class Group extends GroupApi {
    }
    Api.Group = Group;
    class GroupMember extends GroupMemberApi {
    }
    Api.GroupMember = GroupMember;
    class GroupPost extends GroupPostApi {
    }
    Api.GroupPost = GroupPost;
    class GroupPostLike extends GroupPostLikeApi {
    }
    Api.GroupPostLike = GroupPostLike;
    class GroupPostComment extends GroupPostCommentApi {
    }
    Api.GroupPostComment = GroupPostComment;
    class DirectMessage extends DirectMessageApi {
    }
    Api.DirectMessage = DirectMessage;
})(Api || (Api = {}));
