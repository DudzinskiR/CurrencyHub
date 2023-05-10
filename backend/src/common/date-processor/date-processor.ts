export interface DateInfo {
  date: Date,
  value: any
}

class DateProcessor<T> {
  private timeBreakpoints: number[] = [];
  private dates: DateInfo[] = [];
  private tempDates: DateInfo[][] = [];
  private callback: ((tab: DateInfo[]) => T) | undefined;
  private result: T[] = []
  private relativeDate: Date = new Date();

  constructor() {};

  public execute() {
    this.result = [];

    if(this.timeBreakpoints.length > 0) {
    
      this.timeBreakpoints.forEach((breakpoint, index) => {
        this.tempDates.push([]);

        for(const date of this.dates){
          if(this.daysDiff(this.relativeDate, date.date) < breakpoint){
            this.tempDates[index].push(date);
          }
        }

      });
    } else {

      this.tempDates.push([]);
      for(const date of this.dates){
        this.tempDates[0].push(date);
      }
    }


    for(const item of this.tempDates) {
      if(this.callback)
        this.result.push(this.callback(item));
    }

    return this.result;
  }

  private daysDiff = (start: Date, end: Date) => {
    return Math.floor((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24))
  };

  public setTimeBreakpoints(timeBreakpoints: number[]) {
    this.timeBreakpoints = timeBreakpoints;
    return this;
  }

  public setDates(dates: DateInfo[]){
    this.dates = dates;
    return this;
  }

  public setCallback(callback: ((tab: DateInfo[]) => T) | undefined){
    this.callback = callback;
    return this;
  }

  public setRelativeDate(date: Date){
    this.relativeDate = date;
    return this;
  }
}

export default DateProcessor;