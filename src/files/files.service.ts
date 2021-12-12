import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	getFileContents,
	indexes,
	searchInContents,
	wordCount,
} from 'src/common/utils';
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

	async findAll(level: number) {
		return await this.fileRepository
			.createQueryBuilder('file')
			.leftJoinAndSelect('file.user', 'user')
			.where('file.level <= :level', {
				level: level,
			})
			.getMany();
	}

	async findOne(id: number) {
		const file = await this.fileRepository.findOne(id);
		return file;
	}

	async remove(id: number) {
		const file = await this.findOne(id);
		if (!file)
			throw new HttpException('File not found', HttpStatus.NOT_FOUND);
		const filePath = './public/' + file.path;
		if (fs.existsSync(filePath)) {
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});
		}
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
				const content = await getFileContents(`public/${file.path}`);
				if (!content)
					return {
						ocurrences: 0,
					};
				const resultSearch = indexes(content, search);
				const words = wordCount(content);

				item.ocurrences = resultSearch.length;
				item.words = words;
				item.characters = content.length;
				return item;
			}),
		);
		results = results.filter((item: any) => item.ocurrences > 0);

		return results;
	}

	async byName(search: string, level: number) {
		const filteredFiles = await this.fileRepository
			.createQueryBuilder('file')
			.leftJoinAndSelect('file.user', 'user')
			.where(`file.level <= :level and file.filename like :search`, {
				level: level,
				search: `%${search}%`,
			})
			.getMany();

		const filter2 = filteredFiles.filter((file) => {
			return file.filename.search(search) != -1;
		});
		const filter3 = filter2.map((file) => {
			const res: any = { ...file };
			res.ocurrences = indexes(file.filename, search).length;
			return res;
		});

		return filter3;
	}
}
