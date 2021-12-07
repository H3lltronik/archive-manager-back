import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(dto: CreateUserDto) {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(dto.password, salt);

		const user = this.userRepository.create({
			username: dto.username,
			password: hashedPass,
			name: dto.name,
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

	async addFile(id: number) {
		const user = await this.userRepository.findOne(id);
		if (!user) {
			throw new HttpException('', HttpStatus.NOT_FOUND);
		}
		return user;
	}
}
