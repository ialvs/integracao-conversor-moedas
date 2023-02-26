import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { apikey } from 'src/utils/apikey';
import { Conversion } from 'src/utils/conversion';
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

    async convert(targetCurrency: string,
        sourceCurrency: string,
        sourceValue: number,
        idUser: number): Promise<Transaction> {

        const header = new Headers()
        header.append(apikey.id, apikey.keyvalue)

        const config = {
            method: 'GET',
            headers: header
        }

        const requestInit: RequestInit = { ...config };

        const url: string =
            `https://api.apilayer.com/exchangerates_data/convert?to=${targetCurrency}&from=${sourceCurrency}&amount=${sourceValue}`

        const conversion: Conversion = await JSON.parse
            (JSON.stringify
                (await this.fetchConversion(url, requestInit))) as Conversion

        return await this.transactionRepository.save({
            sourceCurrency: conversion.query.from,
            targetCurrency: conversion.query.to,
            sourceValue: conversion.query.amount,
            conversionRate: conversion.info.rate,
            dateTime: this.timestampToUTC(conversion.info.timestamp),
            convertedValue: conversion.result,
            user: {
                id: idUser
            }
        })
    }

    timestampToUTC(timestamp: number): string {
        const date = new Date(timestamp * 1000)
        return date.toISOString()
    }

    async fetchConversion(url: string, requestInit: RequestInit): Promise<any> {
        const response = await fetch(url, requestInit);
        const data = await response.json()
        return data;
    }

    async findByUser(id: number): Promise<Transaction[]> {
        return await this.transactionRepository.find({
            where: {
                user: {
                    id: id
                }
            }
        }
        )
    }
}