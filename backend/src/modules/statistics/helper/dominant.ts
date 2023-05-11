import { DateInfo } from "../../../common/date-processor/date-processor";

const calcDominant = (list: DateInfo[]): number[] => {
  if(list.length === 0){
    return [];
  }

  const map = new Map<number, number>();
  let maxCount = 0;
  const fixedList = [...list].map((item) => {
    return {
      date: item.date,
      value: Number(Number(item.value).toFixed(2))
    }
  });


  for(const item of fixedList){
    if(map.has(item.value)){
      const count = map.get(item.value)! + 1;
      map.set(item.value, count);

      if(count > maxCount){
        maxCount = count;
      }
    } else {
      map.set(item.value, 1);
    }
  }
  
  const output: number[] = []
  for(const [key, value] of map){
    if(value === maxCount){
      output.push(key);
    }
  }

  return output;
}

export default calcDominant