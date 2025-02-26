/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column()
  username: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })  // Initially nullable for migration purposes
  nickname: string;

  @BeforeInsert()
  setNickname() {
      if (!this.nickname) {
          this.nickname = '@'+this.name;
      }
  }

  @Column({nullable:false})
  @IsEmail()
  email: string;

  @Column({nullable:false})
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}