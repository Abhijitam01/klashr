import { ColumnNumeric } from '@server/core/database'
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

import { Group } from '../../../modules/group/domain'

import { User } from '../../../modules/user/domain'

import { GroupPostLike } from '../../../modules/groupPostLike/domain'

import { GroupPostComment } from '../../../modules/groupPostComment/domain'

@Entity()
export class GroupPost {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  content: string

  @Column({})
  groupId: string

  @ManyToOne(() => Group, parent => parent.groupPosts)
  @JoinColumn({ name: 'groupId' })
  group?: Group

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.groupPosts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => GroupPostLike, child => child.groupPost)
  groupPostLikes?: GroupPostLike[]

  @OneToMany(() => GroupPostComment, child => child.groupPost)
  groupPostComments?: GroupPostComment[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
