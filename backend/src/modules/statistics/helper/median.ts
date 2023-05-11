import { DateInfo } from "../../../common/date-processor/date-processor";

const calcMedian = (list: DateInfo[]): number => {
  if(list.length === 0)
  return 0;

  const sortedList = [...list].sort((a,b) => a.value - b.value);
  const middleIndex = Math.floor(sortedList.length / 2);

  if(sortedList.length %  2 === 0) {
    const middleSum = sortedList[middleIndex].value + sortedList[middleIndex - 1].value;
    return middleSum / 2;
  } else {
    return sortedList[middleIndex].value;
  }
}

export default calcMedian