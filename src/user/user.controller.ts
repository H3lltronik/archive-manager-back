import {
	Body,
	Controller,
	Post,
	Req,
	Request,
	Res,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AddFileDto } from './dto/add-file.dto';
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

	@UseGuards(AuthenticatedGuard)
	@Post('add-file')
	addFile(@Request() req, @Body() addFileDto: AddFileDto) {
		return this.userService.addFile(addFileDto.fileId, req.user);
	}
}
