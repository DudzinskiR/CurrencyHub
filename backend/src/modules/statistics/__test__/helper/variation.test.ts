import { DateInfo } from "../../../../common/date-processor/date-processor";
import calcCoefficientOfVariation from "../../helper/variation";

describe('calcVariation', () => {
  it('should return 0 for empty input list', () => {
    const mockList: DateInfo[] = [];
    const result = calcCoefficientOfVariation(mockList);
    expect(result).toEqual(0);
  });

  it('should calculate coefficient of variation correctly', () => {
    const mockList: DateInfo[] = [
      { date: new Date(), value: 10 },
      { date: new Date(), value: 20 },
      { date: new Date(), value: 30 },
      { date: new Date(), value: 40 },
      { date: new Date(), value: 50 },
    ];

    //Mean = 30
    //Standard Deviation ~14.1421356
    //Coefficient of variation: Standard Deviation / Mean ~~ 52.270462

    const result = calcCoefficientOfVariation(mockList);
    expect(result).toBeCloseTo(47.140452, 6);
  })
})