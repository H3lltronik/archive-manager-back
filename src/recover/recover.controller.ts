import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { RecoverService } from './recover.service';
import { CreateRecoverDto } from './dto/create-recover.dto';
import { DoRecoverDto } from './dto/do-recover.dto';

@Controller('recover')
export class RecoverController {
	constructor(private readonly recoverService: RecoverService) {}

	@Post()
	requestReset(@Body() createRecoverDto: CreateRecoverDto) {
		return this.recoverService.create(createRecoverDto);
	}

	@Post('do-recover')
	doReset(@Body() doRecoverDto: DoRecoverDto) {
		return this.recoverService.doReset(doRecoverDto);
	}

	@Get(':token')
	findOne(@Param('token') token: string) {
		return this.recoverService.findOne(token);
	}
}
