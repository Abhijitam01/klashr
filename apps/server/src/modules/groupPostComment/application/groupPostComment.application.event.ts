export namespace GroupPostCommentApplicationEvent {
  export namespace GroupPostCommentCreated {
    export const key = 'groupPostComment.application.groupPostComment.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
