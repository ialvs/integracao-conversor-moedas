import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    dateTime: string

    @Column()
    convertedValue: number

    @ManyToOne(() => User, (user) => user.transactions)
    user: User
}

