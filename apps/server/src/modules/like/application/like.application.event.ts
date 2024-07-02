export namespace LikeApplicationEvent {
  export namespace LikeCreated {
    export const key = 'like.application.like.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
