import { User } from 'src/user/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recover')
export class Recover {
	@PrimaryGeneratedColumn()
	id: string;

	@ManyToOne(() => User, (user) => user.recoverTokens)
	@JoinColumn()
	user: User;

	@Column()
	token: string;

	@Column()
	expiresAt: Date;

	@CreateDateColumn()
	createdAt: Date;
}
