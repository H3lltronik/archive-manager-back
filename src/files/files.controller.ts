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
	Query,
	HttpException,
	HttpStatus,
	Response,
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

	@UseGuards(AuthenticatedGuard)
	@Get('search')
	search(@Request() req, @Query('search') search: string) {
		// if (search.length <= 0) return this.filesService.findAll();
		return this.filesService.search(search, req.user.level);
	}

	@UseGuards(AuthenticatedGuard)
	@Get('byName')
	byName(@Request() req, @Query('search') search: string) {
		// if (search.length <= 0) return this.filesService.findAll();
		return this.filesService.byName(search, req.user.level);
	}

	@UseGuards(AuthenticatedGuard)
	@Get('getAll')
	getAll(@Request() req) {
		return this.filesService.findAll(req.user.level);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.filesService.findOne(+id);
	}

	@UseGuards(AuthenticatedGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.filesService.remove(+id);
	}

	@UseGuards(AuthenticatedGuard)
	@Post('file-upload')
	@UseInterceptors(FileInterceptor('file', FilesStorage.configuration()))
	async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
		if (!req.file) {
			throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
		}

		return file;
	}
}
