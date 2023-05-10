import { DateInfo } from "../../../../common/date-processor/date-processor";
import calcMedian from "../../helper/median";

describe('calcMedian', () => {
  it('should return 0 for empty list', () => {
    const mockList: DateInfo[] = [];
    const result = calcMedian(mockList);
    expect(result).toEqual(0);
  });

  it('should calculate median currently for odd-length list', () => {
    const mockList: DateInfo[] = [
      { date: new Date(), value: 10 },
      { date: new Date(), value: 20 },
      { date: new Date(), value: 30 },
      { date: new Date(), value: 40 },
      { date: new Date(), value: 50 },
    ];
    const result = calcMedian(mockList);
    expect(result).toEqual(30);
  });

  it('should calculate median currently for even-length list', () => {
    const mockList: DateInfo[] = [
      { date: new Date(), value: 10 },
      { date: new Date(), value: 20 },
      { date: new Date(), value: 30 },
      { date: new Date(), value: 40 },
    ];
    const result = calcMedian(mockList);
    expect(result).toEqual(25);
  });

  it('should return single value for single-value list', () => {
    const mockList: DateInfo[] = [
      { date: new Date(), value: 10 },
    ];
    const result = calcMedian(mockList);
    expect(result).toEqual(10);
  });
})