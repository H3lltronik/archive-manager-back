import { File } from 'src/files/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@OneToMany(() => File, (file) => file.user)
	files: File[];
}
