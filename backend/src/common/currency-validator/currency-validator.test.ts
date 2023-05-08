import InvalidCurrencyError from '../../exceptions/invalid-currency.exception';
import { getTableByCode } from './currency-validator';

describe('CurrencyValidator', () => { 
  it('should return correct table name', () => {
    expect(getTableByCode('USD')).toEqual('A');
    expect(getTableByCode('CHF')).toEqual('A');
    expect(getTableByCode('GBP')).toEqual('A');

    expect(getTableByCode('ARS')).toEqual('B');
    expect(getTableByCode('TWD')).toEqual('B');
    expect(getTableByCode('TOP')).toEqual('B');
  });

  it('should throw InvalidCurrencyError when code is not found in any table', () => {
    expect(() => getTableByCode('XYZ')).toThrow(InvalidCurrencyError);
  })
})