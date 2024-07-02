import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class GroupPostCommentCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  groupPostId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class GroupPostCommentUpdateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  groupPostId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
