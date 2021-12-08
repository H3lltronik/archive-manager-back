import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { indexes, searchInContents } from 'src/common/utils';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
const fs = require('fs');
const path = require('path');

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
			level: user.level,
			path: createFileDto.path,
			mimetype: createFileDto.mimetype,
			size: createFileDto.size,
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

	async search(search: string, level: number) {
		const filteredFiles = await this.fileRepository
			.createQueryBuilder('file')
			.leftJoinAndSelect('file.user', 'user')
			.where('file.level <= :level', {
				level: level,
			})
			.getMany();

		let results = await Promise.all(
			filteredFiles.map(async (file) => {
				const item: any = {};
				Object.assign(item, file);
				const result = await searchInContents(
					search,
					`public/${file.path}`,
				);
				item.ocurrences = result.length;
				return item;
			}),
		);
		results = results.filter((item: any) => item.ocurrences > 0);

		return results;
	}
}
