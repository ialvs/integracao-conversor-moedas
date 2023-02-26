import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';


@Controller('api/v1/transactions')
export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    @Get(':id')
    async GetOne(@Param('id') id: number): Promise<Transaction> {
        return await this.transactionService.findOne(id)
    }

    @Delete(':id')
    async Delete(@Param() id: number): Promise<DeleteResult> {

        return await this.transactionService.remove(id)
    }

    @Get('/convert/:idUser/:to/:from/:amount')
    async Convert(@Param('to') targetCurrency: string,
        @Param('from') sourceCurrency: string,
        @Param('amount') sourceValue: number,
        @Param('idUser') idUser: number): Promise<Transaction> {

        return await this.transactionService.convert(targetCurrency, sourceCurrency, sourceValue, idUser)
    }

    @Get('/user/:userId')
    async GetByUser(@Param('userId') userId: number): Promise<Transaction[]>{
        return await this.transactionService.findByUser(userId)
    }
}