import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    sourceCurrency: string

    @Column()
    sourceValue: number

    @Column()
    targetCurrency: string
    
    @Column()
    conversionRate: number

    @Column({type:"datetime"})
    dateTime: string

    @ManyToOne(() => User, (user) => user.transactions,{cascade: true, eager: true})
    user: User
}

