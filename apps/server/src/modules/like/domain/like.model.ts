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

import { PostData } from '../../../modules/postData/domain'

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.likes)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  postId: string

  @ManyToOne(() => PostData, parent => parent.likes)
  @JoinColumn({ name: 'postId' })
  post?: PostData

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
