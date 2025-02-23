/* eslint-disable prettier/prettier */
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column()
  name: string

  @Column({type: 'integer', default: 0})
  quantity: number

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: "CURRENT_TIMESTAMP(6)"})
  updated_at: Date
}