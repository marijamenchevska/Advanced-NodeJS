import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../common/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: `User's ID`,
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    type: String,
    description: `User's email`,
    example: 'marija@gmail.com',
  })
  username: string;

  @Column()
  @ApiProperty({
    type: String,
    description: `User's password`,
    example: 'Pass111!',
  })
  password: string;

  @Column({
    enum: Role,
    enumName: 'role',
    default: Role.USER,
  })
  @ApiProperty({
    enum: Role,
    description: `User's role`,
    example: Role.USER,
    default: Role.USER,
  })
  role: Role;
}
