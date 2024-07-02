export namespace GroupPostApplicationEvent {
  export namespace GroupPostCreated {
    export const key = 'groupPost.application.groupPost.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
