import { IsOptional, IsString } from 'class-validator';

export class XmlDto {
  @IsString()
  @IsOptional()
  public delimiter;

  @IsString()
  @IsOptional()
  public separator;
}
