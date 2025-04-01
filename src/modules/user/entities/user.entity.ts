/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany, ManyToMany } from 'typeorm';
import { IsEmail } from "class-validator";
import { Event } from 'src/modules/event/entities/event.entity';

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
          this.nickname = '@'+this.username.toLowerCase();
      }
  }

  @Column({nullable:false})
  @IsEmail()
  email: string;

  @Column({nullable:false})
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => Event, (event) => event.guests)
  events: [];

  @OneToMany(() => Event, (event) => event.admin)
  managed_events: Event[];
}