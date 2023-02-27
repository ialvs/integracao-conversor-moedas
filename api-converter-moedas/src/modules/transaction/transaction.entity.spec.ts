import { Transaction } from './transaction.entity';
import { User } from '../user/user.entity';

describe('Transaction', () => {
  it('should create a new transaction instance with defined attributes', () => {
    const user = new User();
    const transaction = new Transaction();
    transaction.sourceCurrency = 'USD';
    transaction.sourceValue = 100;
    transaction.targetCurrency = 'EUR';
    transaction.conversionRate = 0.85;
    transaction.dateTime = '2022-02-26 12:34:56';
    transaction.convertedValue = 85;
    transaction.user = user;

    expect(transaction).toBeDefined();
    expect(transaction.sourceCurrency).toEqual('USD');
    expect(transaction.sourceValue).toEqual(100);
    expect(transaction.targetCurrency).toEqual('EUR');
    expect(transaction.conversionRate).toEqual(0.85);
    expect(transaction.dateTime).toEqual('2022-02-26 12:34:56');
    expect(transaction.convertedValue).toEqual(85);
    expect(transaction.user).toEqual(user);
  });
});
