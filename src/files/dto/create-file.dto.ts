import { IsNotEmpty } from 'class-validator';

export class CreateFileDto {
	@IsNotEmpty()
	filename: string;

	@IsNotEmpty()
	path: string;

	@IsNotEmpty()
	level: number;

	@IsNotEmpty()
	mimetype: string;

	@IsNotEmpty()
	size: number;
}
