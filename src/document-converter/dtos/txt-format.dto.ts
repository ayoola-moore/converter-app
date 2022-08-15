import { IsString } from 'class-validator';

export class TxtDto {
  @IsString()
  public delimiter;

  @IsString()
  public separator;
}
