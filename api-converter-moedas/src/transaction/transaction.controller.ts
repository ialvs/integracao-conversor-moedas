import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { apikey } from 'src/apikey';
import { Conversion } from 'src/conversion';

@Controller('api/v1/transactions')
export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    @Get()
    async GetAll(): Promise<Transaction[]> {
        return await this.transactionService.findAll()
    }

    @Post()
    async Create(@Body() Transaction: Transaction): Promise<Transaction> {
        return await this.transactionService.create(Transaction)
    }

    @Get(':id')
    async GetOne(@Param('id') id: number): Promise<Transaction> {
        return await this.transactionService.findOne(id)
    }

    @Delete(':id')
    async Delete(@Param() id: number): Promise<DeleteResult> {

        return await this.transactionService.remove(id)
    }

    @Put(':id')
    async Update(@Param() id: number, @Body() Transaction: Transaction): Promise<UpdateResult> {
        return await this.transactionService.update(id, Transaction);

    }

    @Get('/convert/:to/:from/:amount')
    async Convert(@Param('to') targetCurrency: string, @Param('from') sourceCurrency: string, @Param('amount') sourceValue: number): Promise<Transaction> {

        const header = new Headers()
        header.append(apikey.id, apikey.value)

        const config = {
            method: 'GET',
            headers: header
        }

        const requestInit: RequestInit = { ...config };

        const convertMessage = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${targetCurrency}&from=${sourceCurrency}&amount=${sourceValue}`, requestInit)
            .then(response => response.json())
            .catch(error => console.log('error', error));

        const conversion: Conversion = JSON.parse(convertMessage)
        return await this.transactionService.convert(conversion)

    }

}