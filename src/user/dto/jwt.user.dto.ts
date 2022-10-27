import { IsNumber, IsString } from "class-validator";

export class LoginUserDto {
    @IsNumber()
    id: string;
  
    @IsString()
    name: string;
}
  