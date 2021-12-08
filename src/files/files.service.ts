import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(File)
		private fileRepository: Repository<File>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(createFileDto: CreateFileDto, user: User) {
		const foundUser = await this.userRepository.findOne(user);
		const file = this.fileRepository.create({
			filename: createFileDto.filename,
			level: createFileDto.level,
			path: createFileDto.path,
			user: foundUser,
		});
		return await this.fileRepository.save(file);
	}

	async findAll() {
		return await this.fileRepository.find();
	}

	async findOne(id: number) {
		const file = await this.fileRepository.findOne(id);
		return file;
	}

	async remove(id: number) {
		const file = await this.findOne(id);
		return await this.fileRepository.remove(file);
	}
}
