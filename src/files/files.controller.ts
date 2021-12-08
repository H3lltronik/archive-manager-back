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
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesStorage } from 'src/config/fileStorage';
const fs = require('fs');

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	create(@Body() createFileDto: CreateFileDto) {
		return this.filesService.create(createFileDto);
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

	@Post('file-upload')
	@UseInterceptors(FileInterceptor('file', FilesStorage.configuration()))
	async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
		const filename = req.file.path;
		const filenamePath = `${req.file.destination}${req.file.filename}`;

		return file;
	}
}
