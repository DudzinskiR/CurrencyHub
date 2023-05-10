import { DateInfo } from "../../../../common/date-processor/date-processor";
import calcStandardDeviation from "../../helper/deviation";

describe('calCDeviation', () => {
  it('should return 0 for empty input list', () => {
    const mockList: DateInfo[] = [];
    const result = calcStandardDeviation(mockList);
    expect(result).toEqual(0);
  });

  it('should calculate standard deviation correctly', () => {
    const mockList: DateInfo[] = [
      { date: new Date(), value: 10 },
      { date: new Date(), value: 20 },
      { date: new Date(), value: 30 },
      { date: new Date(), value: 40 },
      { date: new Date(), value: 50 },
    ];

    const result = calcStandardDeviation(mockList);
    expect(result).toBeCloseTo(14.1421356, 6);
  });

  it('should return 0 for a single-value list', () => {
    const mockList: DateInfo[] = [
      { date: new Date(), value: 10 }
    ];

    const result = calcStandardDeviation(mockList);
    expect(result).toEqual(0);
  })
})