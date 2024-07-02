export namespace GroupMemberApplicationEvent {
  export namespace GroupMemberCreated {
    export const key = 'groupMember.application.groupMember.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
