import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DirectMessageCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsOptional()
  senderId?: string

  @IsString()
  @IsOptional()
  receiverId?: string

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

export class DirectMessageUpdateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  senderId?: string

  @IsString()
  @IsOptional()
  receiverId?: string

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
