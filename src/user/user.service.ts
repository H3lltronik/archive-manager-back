import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(File)
		private fileRepository: Repository<File>,
	) {}

	async create(dto: CreateUserDto) {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(dto.password, salt);

		const user = this.userRepository.create({
			username: dto.username,
			password: hashedPass,
			name: dto.name,
			level: dto.level,
		});

		const { password, ...savedUser } = await this.userRepository.save(user);

		try {
			return savedUser;
		} catch (error) {
			if (error instanceof QueryFailedError) {
				console.log(error);
				throw new HttpException(
					'Username already exists',
					HttpStatus.CONFLICT,
				);
			}
		}
	}

	async findOneByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { username },
		});
		if (!user)
			throw new HttpException('Wrong credentials', HttpStatus.NOT_FOUND);
		return user;
	}

	async findOne(id: number) {
		const user = await this.userRepository.findOne(id);
		if (!user) {
			throw new HttpException('', HttpStatus.NOT_FOUND);
		}
		return user;
	}

	async update(id: number, dto: UpdateUserDto): Promise<User> {
		const user = await this.userRepository.findOne(id);
		if (!user)
			throw new HttpException(
				"User doesn't exists",
				HttpStatus.NOT_FOUND,
			);

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(dto.password, salt);

		user.password = hashedPass;
		return this.userRepository.save(user);
	}

	async addFile(id: number, user: User) {
		const file = await this.fileRepository.findOne(id);
		if (!file || !user) {
			throw new HttpException('', HttpStatus.NOT_FOUND);
		}

		file.user = user;

		return await this.fileRepository.save(file);
	}
}
