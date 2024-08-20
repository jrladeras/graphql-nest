import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
} from 'class-validator';

@InputType()
export class CustomerDto {
  @Field()
  @IsOptional()
  @Transform(({ value }) => value?.toString().trim())
  fullname: string;

  @Field()
  @IsOptional()
  contact_number: string;

  @Field()
  @IsOptional()
  @IsEmail()
  email: string;
}
