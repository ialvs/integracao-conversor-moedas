import { User } from './user.entity';
import { Transaction } from '../transaction/transaction.entity';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.id = 1;
    user.name = 'John Doe';
    user.email = 'johndoe@example.com';
    user.transactions = [new Transaction(), new Transaction()];
  });

  it('should have an id', () => {
    expect(user.id).toBeDefined();
  });

  it('should have a name', () => {
    expect(user.name).toBeDefined();
  });

  it('should have an email', () => {
    expect(user.email).toBeDefined();
  });

  it('should have transactions', () => {
    expect(user.transactions).toBeDefined();
  });

  it('should have an array of transactions', () => {
    expect(user.transactions).toBeInstanceOf(Array);
  });

  it('should have two transactions', () => {
    expect(user.transactions.length).toBe(2);
  });

  it('should have transactions of type Transaction', () => {
    expect(user.transactions[0]).toBeInstanceOf(Transaction);
    expect(user.transactions[1]).toBeInstanceOf(Transaction);
  });
});
