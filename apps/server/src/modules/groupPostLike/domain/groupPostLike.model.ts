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

import { User } from '../../../modules/user/domain'

import { GroupPost } from '../../../modules/groupPost/domain'

@Entity()
export class GroupPostLike {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.groupPostLikes)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  groupPostId: string

  @ManyToOne(() => GroupPost, parent => parent.groupPostLikes)
  @JoinColumn({ name: 'groupPostId' })
  groupPost?: GroupPost

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
