import { DateInfo } from "../../../common/date-processor/date-processor";

const calcStandardDeviation = (list: DateInfo[]): number => {
  if(list.length === 0){
    return 0;
  }

  const mean = list.reduce((sum, value) => sum + value.value, 0) / list.length;

  const squaredDifferences = [...list].map(value => Math.pow(value.value - mean, 2));

  const sumOfSquaredDifferences = squaredDifferences.reduce((sum, value) => sum + value, 0);

  const variance = sumOfSquaredDifferences / list.length;

  const standardDeviation = Math.sqrt(variance);

  return standardDeviation
}

export default calcStandardDeviation;