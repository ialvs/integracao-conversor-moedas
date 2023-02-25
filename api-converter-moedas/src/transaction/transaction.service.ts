import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversion } from 'src/conversion';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) { }

    async findAll(): Promise<Transaction[]> {

        return await this.transactionRepository.find({
            relations: {
                user: true
            },
        })

    }

    async findOne(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOne({
            where: { id: id }, relations: { user: true }
        })
    }

    async create(Transaction: Transaction): Promise<Transaction> {

        return await this.transactionRepository.save(Transaction);

    }

    async update(id: number, Transaction: Transaction): Promise<UpdateResult> {
        return await this.transactionRepository.update(id, Transaction)
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.transactionRepository.delete(id);
    }

    async convert(idUser: number, conversion: Conversion): Promise<Transaction>{
        const transaction = this.transactionRepository.create({
            sourceCurrency: conversion.query.from,
            targetCurrency: conversion.query.to,
            sourceValue: conversion.query.amount,
            conversionRate: conversion.info.rate,
            dateTime: this.timestampToUTC(conversion.info.timestamp),
            convertedValue: conversion.query.amount * conversion.info.rate,
            user: {id: idUser}
        })
        return await this.transactionRepository.save(transaction)
    }

    timestampToUTC(timestamp: number): string{
        const date = new Date(timestamp*1000)
        return date.toISOString()
    }
}