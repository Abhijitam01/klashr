export namespace GroupPostLikeApplicationEvent {
  export namespace GroupPostLikeCreated {
    export const key = 'groupPostLike.application.groupPostLike.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
