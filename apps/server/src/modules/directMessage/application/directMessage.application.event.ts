export namespace DirectMessageApplicationEvent {
  export namespace DirectMessageCreated {
    export const key = 'directMessage.application.directMessage.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
