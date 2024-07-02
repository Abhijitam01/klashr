import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class GroupPostLikeCreateDto {
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

export class GroupPostLikeUpdateDto {
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
