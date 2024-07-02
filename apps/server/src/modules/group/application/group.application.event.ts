export namespace GroupApplicationEvent {
  export namespace GroupCreated {
    export const key = 'group.application.group.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
