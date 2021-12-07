import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

	@ManyToOne(() => User, (user) => user.files)
	user: User;
}
