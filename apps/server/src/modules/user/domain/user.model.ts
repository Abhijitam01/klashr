import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Notification } from '../../../modules/notification/domain'

import { PostData } from '../../../modules/postData/domain'

import { Like } from '../../../modules/like/domain'

import { Comment } from '../../../modules/comment/domain'

import { GroupMember } from '../../../modules/groupMember/domain'

import { GroupPost } from '../../../modules/groupPost/domain'

import { GroupPostLike } from '../../../modules/groupPostLike/domain'

import { GroupPostComment } from '../../../modules/groupPostComment/domain'

import { DirectMessage } from '../../../modules/directMessage/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => PostData, child => child.user)
  posts?: PostData[]

  @OneToMany(() => Like, child => child.user)
  likes?: Like[]

  @OneToMany(() => Comment, child => child.user)
  comments?: Comment[]

  @OneToMany(() => GroupMember, child => child.user)
  groupMembers?: GroupMember[]

  @OneToMany(() => GroupPost, child => child.user)
  groupPosts?: GroupPost[]

  @OneToMany(() => GroupPostLike, child => child.user)
  groupPostLikes?: GroupPostLike[]

  @OneToMany(() => GroupPostComment, child => child.user)
  groupPostComments?: GroupPostComment[]

  @OneToMany(() => DirectMessage, child => child.sender)
  directMessagesAsSender?: DirectMessage[]

  @OneToMany(() => DirectMessage, child => child.receiver)
  directMessagesAsReceiver?: DirectMessage[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
