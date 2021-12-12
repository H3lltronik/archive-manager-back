import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRecoverDto } from './dto/create-recover.dto';
import { Recover } from './entities/recover.entity';
import { v4 as uuidv4 } from 'uuid';
import { DoRecoverDto } from './dto/do-recover.dto';
import * as bcrypt from 'bcrypt';
import sendRecoverMail from 'src/common/api/mail';

@Injectable()
export class RecoverService {
	constructor(
		@InjectRepository(Recover)
		private recoverRepository: Repository<Recover>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(createRecoverDto: CreateRecoverDto) {
		const user = await this.userRepository.findOne({
			where: { username: createRecoverDto.username },
		});
		if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

		const token = uuidv4();
		const recover = this.recoverRepository.create({
			user,
			expiresAt: new Date(), // TODO: Fix expiration
			token,
		});
		const result = await this.recoverRepository.save(recover);

		const sended = await sendRecoverMail({
			email: 'esau.egs1@gmail.com',
			token,
		});

		return result;
	}

	async findOne(token: string) {
		return await this.recoverRepository.findOneOrFail({
			where: { token },
		});
	}

	async doReset(doRecoverDto: DoRecoverDto) {
		const recover = await this.recoverRepository
			.createQueryBuilder('recover')
			.leftJoinAndSelect('recover.user', 'user')
			.where(`recover.token = :token`, {
				token: doRecoverDto.token,
			})
			.getOne();

		if (!recover) {
			throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
		}

		const user = recover.user;
		if (!user)
			throw new HttpException(
				"User doesn't exists",
				HttpStatus.NOT_FOUND,
			);

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(doRecoverDto.password, salt);

		await this.recoverRepository.delete(recover.id);

		user.password = hashedPass;
		const result = this.userRepository.save(user);
		return result;
	}
}
