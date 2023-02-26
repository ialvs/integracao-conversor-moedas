import { Transaction } from 'src/modules/transaction/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
    eager: true,
  })
  transactions: Transaction[];
}
