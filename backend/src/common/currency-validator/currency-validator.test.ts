import InvalidCurrencyException from '../../exceptions/invalid-currency.exception';
import { getTableByCode, validateCode } from './currency-validator';

describe('CurrencyValidator', () => { 
  it('should return correct table name', () => {
    expect(getTableByCode('USD')).toEqual('A');
    expect(getTableByCode('CHF')).toEqual('A');
    expect(getTableByCode('GBP')).toEqual('A');

    expect(getTableByCode('ARS')).toEqual('B');
    expect(getTableByCode('TWD')).toEqual('B');
    expect(getTableByCode('TOP')).toEqual('B');
  });

  it('should throw InvalidCurrencyException when code is not found in any table', () => {
    expect(() => getTableByCode('XYZ')).toThrow(InvalidCurrencyException);
  });

  it('should return true if code is found in any table', () => {
    expect(validateCode('USD')).toBe(true);
    expect(validateCode('ARS')).toBe(true);
  });

  it('should return false if code is not found in any table', () => {
    expect(validateCode('XYZ')).toBe(false);
  });
})