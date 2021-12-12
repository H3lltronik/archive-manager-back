import { IsNotEmpty } from "class-validator";

export class CreateRecoverDto {
    @IsNotEmpty()
	username: string;
}
