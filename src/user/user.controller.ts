import {
	Body,
	Controller,
	Post,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	@UsePipes(ValidationPipe)
	create(@Body() createDto: CreateUserDto) {
		return this.userService.create(createDto);
	}

	@Post('change-password')
	changePassword(@Body() updateDto: UpdateUserDto) {
		return 'not implemented';
	}
}
