import { Conversion } from './Conversion';

describe('Conversion interface', () => {
  it('should have the correct properties', () => {
    const conversion: Conversion = {
      success: true,
      query: {
        from: 'USD',
        to: 'EUR',
        amount: 100,
      },
      info: {
        timestamp: 1645903200,
        rate: 0.828114,
      },
      date: '2022-02-27',
      result: 82.8114,
    };

    expect(conversion).toHaveProperty('success');
    expect(conversion).toHaveProperty('query');
    expect(conversion.query).toHaveProperty('from');
    expect(conversion.query).toHaveProperty('to');
    expect(conversion.query).toHaveProperty('amount');
    expect(conversion).toHaveProperty('info');
    expect(conversion.info).toHaveProperty('timestamp');
    expect(conversion.info).toHaveProperty('rate');
    expect(conversion).toHaveProperty('date');
    expect(conversion).toHaveProperty('result');
  });
});
