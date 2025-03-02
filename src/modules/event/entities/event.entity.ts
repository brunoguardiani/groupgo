/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ nullable: true })
  name: string;
  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date; 
  
  @ManyToMany(() => User, (user) => user.events, { nullable: true })
  @JoinTable({
    name: "event_guest", // 👈 Custom table name
    joinColumn: {
      name: "event_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  guests: User[]

  @ManyToOne(() => User, (user) => user.managed_events, { nullable: false })
  @JoinColumn( { name: 'admin' } )
  admin: User;
}