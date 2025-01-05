export var UserStatus;
(function (UserStatus) {
    UserStatus["CREATED"] = "CREATED";
    UserStatus["VERIFIED"] = "VERIFIED";
})(UserStatus || (UserStatus = {}));
export class User {
    id;
    email;
    status;
    name;
    pictureUrl;
    password;
    dateCreated;
    dateUpdated;
    notifications;
    posts;
    likes;
    comments;
    groupMembers;
    groupPosts;
    groupPostLikes;
    groupPostComments;
    directMessagesAsSender;
    directMessagesAsReceiver;
}
