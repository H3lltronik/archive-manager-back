import { IsNotEmpty } from 'class-validator';

export class DoRecoverDto {
	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	token: string;
}
