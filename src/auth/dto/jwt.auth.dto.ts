import { IsNumber, IsString } from "class-validator";

export class JwtAuthDto {
    @IsNumber()
    id: string;
  
    @IsString()
    name: string;
}
  