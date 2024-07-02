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

@Entity()
export class GroupMember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  groupId: string

  @ManyToOne(() => Group, parent => parent.groupMembers)
  @JoinColumn({ name: 'groupId' })
  group?: Group

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.groupMembers)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
