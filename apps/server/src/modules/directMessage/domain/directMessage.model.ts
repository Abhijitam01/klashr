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

@Entity()
export class DirectMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  content: string

  @Column({})
  senderId: string

  @ManyToOne(() => User, parent => parent.directMessagesAsSender)
  @JoinColumn({ name: 'senderId' })
  sender?: User

  @Column({})
  receiverId: string

  @ManyToOne(() => User, parent => parent.directMessagesAsReceiver)
  @JoinColumn({ name: 'receiverId' })
  receiver?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
