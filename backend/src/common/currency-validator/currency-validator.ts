import InvalidCurrencyError from "../../exceptions/invalid-currency.exception";
import table from "./currency-in-table";

export const getTableByCode = (currencyCode: string): 'A' | 'B' => {
  if(table.A.includes(currencyCode)) {
    return 'A';
  } else if (table.B.includes(currencyCode)) {
    return 'B';
  } else {
    throw new InvalidCurrencyError(currencyCode);
  }
}

export const validateCode = (currencyCode: string): boolean => {
  return table.A.includes(currencyCode) || table.B.includes(currencyCode);
}