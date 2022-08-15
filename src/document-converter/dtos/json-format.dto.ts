import { IsOptional, IsString } from 'class-validator';

export class JsonDto {
  @IsString()
  @IsOptional()
  public delimiter;

  @IsString()
  @IsOptional()
  public separator;
}
