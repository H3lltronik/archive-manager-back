import { User } from 'src/user/entities/user.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('file')
export class File {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	filename: string;

	@Column()
	path: string;

	@Column()
	level: number;

	@Column()
	size: number;

	@Column()
	mimetype: string;

	@ManyToOne(() => User, (user) => user.files, {
		eager: true,
	})
	@JoinColumn()
	user: User;
}
