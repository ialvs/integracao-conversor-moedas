import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { apikey } from 'src/apikey';
import { Conversion } from 'src/conversion';

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
    async Convert(@Param('to') targetCurrency: string, @Param('from') sourceCurrency: string, @Param('amount') sourceValue: number, @Param('idUser') idUser: number): Promise<Transaction> {

        const header = new Headers()
        header.append(apikey.id, apikey.value)

        const config = {
            method: 'GET',
            headers: header
        }

        const requestInit: RequestInit = { ...config };

        const url:string = `https://api.apilayer.com/exchangerates_data/convert?to=${targetCurrency}&from=${sourceCurrency}&amount=${sourceValue}`

        const convertMessage: any = await this.fetchConversion(url,requestInit)
        
        const conversion: Conversion = await JSON.parse(JSON.stringify(convertMessage)) as Conversion
        
        return await this.transactionService.convert(idUser, conversion)

    }

    async fetchConversion(url: string, requestInit: RequestInit): Promise<any> {
        const response = await fetch(url, requestInit);
        const data = await response.json()
        return data;
    }



}