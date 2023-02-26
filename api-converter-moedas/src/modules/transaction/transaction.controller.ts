import { Controller, Get, Delete, Param, HttpStatus } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { HttpException } from '@nestjs/common/exceptions';

@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async GetAll(): Promise<Transaction[]> {
    const transactions = await this.transactionService.findAll();

    if (transactions.length > 0) {
      return transactions;
    } else {
      throw new HttpException('No transaction found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async GetOne(@Param('id') id: number): Promise<Transaction> {
    const transaction = await this.transactionService.findOne(id);

    if (transaction) {
      return transaction;
    } else {
      throw new HttpException(
        `No transaction with id ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async Delete(@Param() id: number): Promise<DeleteResult> {
    return await this.transactionService.remove(id);
  }

  @Get('/convert/:idUser/:to/:from/:amount')
  async Convert(
    @Param('to') targetCurrency: string,
    @Param('from') sourceCurrency: string,
    @Param('amount') sourceValue: number,
    @Param('idUser') idUser: number,
  ): Promise<Transaction> {
    return await this.transactionService.convert(
      targetCurrency,
      sourceCurrency,
      sourceValue,
      idUser,
    );
  }

  @Get('/user/:userId')
  async GetByUser(@Param('userId') userId: number): Promise<Transaction[]> {
    return await this.transactionService.findByUser(userId);
  }
}
