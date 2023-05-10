import { DateInfo } from "../../../common/date-processor/date-processor";
import calcStandardDeviation from "./deviation";

const calcCoefficientOfVariation = (list: DateInfo[]): number => {
  if(list.length === 0) {
    return 0;
  }

  const standardDeviation = calcStandardDeviation(list);
  const mean = list.reduce((sum, value) => sum + value.value, 0) / list.length;

  const coefficientOfVariation = (standardDeviation / mean) * 100;

  return coefficientOfVariation;
}

export default calcCoefficientOfVariation;