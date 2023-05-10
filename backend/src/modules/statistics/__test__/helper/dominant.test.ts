import { DateInfo } from "../../../../common/date-processor/date-processor"
import { calcDominant } from "../../helper";

describe('calcDominant', () => {
  it('should return empty array for empty input list', () => {
    const mockList: DateInfo[] = [];
    const result = calcDominant(mockList);

    expect(result).toEqual([]);
  });

  it('should calculate dominant values correctly', () => {
    const mockList: DateInfo[] = [
      {date: new Date(), value: 10},
      {date: new Date(), value: 20},
      {date: new Date(), value: 30},
      {date: new Date(), value: 20},
      {date: new Date(), value: 30},
    ];

    const result = calcDominant(mockList);
    expect(result).toEqual([20,30]);
  });

  it('should return single value if it is the only dominant value', () => {
    const mockList: DateInfo[] = [
      {date: new Date(), value: 10},
      {date: new Date(), value: 10},
      {date: new Date(), value: 10},
    ];

    const result = calcDominant(mockList);
    expect(result).toEqual([10]);
  });
})