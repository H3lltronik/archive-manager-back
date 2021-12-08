import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/common/match.decorator';

export class AddFileDto {
	@IsNotEmpty()
	fileId: number;
}
