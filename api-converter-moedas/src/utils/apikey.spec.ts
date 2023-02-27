import { apikey } from './apikey';
import { apivalue } from './apivalue';

describe('apikey', () => {
  test('should have correct properties', () => {
    expect(apikey).toHaveProperty('id');
    expect(apikey).toHaveProperty('keyvalue');
    expect(apikey.keyvalue).toBe(apivalue.keyvalue);
  });
});
