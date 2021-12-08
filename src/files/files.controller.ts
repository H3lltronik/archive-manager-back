import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	Req,
	Request,
	UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesStorage } from 'src/config/fileStorage';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const fs = require('fs');

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@UseGuards(AuthenticatedGuard)
	@Post()
	create(@Request() req, @Body() createFileDto: CreateFileDto) {
		return this.filesService.create(createFileDto, req.user);
	}

	@Get()
	findAll() {
		return this.filesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.filesService.findOne(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.filesService.remove(+id);
	}

	@UseGuards(AuthenticatedGuard)
	@Post('file-upload')
	@UseInterceptors(FileInterceptor('file', FilesStorage.configuration()))
	async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
		const filename = req.file.path;
		const filenamePath = `${req.file.destination}${req.file.filename}`;

		return file;
	}
}
