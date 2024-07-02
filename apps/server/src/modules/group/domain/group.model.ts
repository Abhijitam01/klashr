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

import { GroupMember } from '../../../modules/groupMember/domain'

import { GroupPost } from '../../../modules/groupPost/domain'

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  description?: string

  @OneToMany(() => GroupMember, child => child.group)
  groupMembers?: GroupMember[]

  @OneToMany(() => GroupPost, child => child.group)
  groupPosts?: GroupPost[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
