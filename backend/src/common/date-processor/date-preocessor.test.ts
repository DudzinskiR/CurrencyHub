import DateProcessor, { DateInfo } from "./date-processor"

describe('DateProcessor', () => {
  it('should divide dates base on time breakpoints', () => {
    const today = new Date()
    const mockDate: DateInfo[] = [
      // < 7
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), value: 'A'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), value: 'B'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 'C'},

      // < 14
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8), value: 'D'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9), value: 'E'},

      // < 30
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18), value: 'F'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 19), value: 'G'},

      // < 90
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 32), value: 'H'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 33), value: 'I'},

      // < 180
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 91), value: 'J'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 92), value: 'K'},

      // other
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 181), value: 'L'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 182), value: 'M'},
    ];

    const mockTimeBreakpoints = [7, 14, 30, 90, 180, 9999];
    const dateProcessor = new DateProcessor()
      .setDates(mockDate)
      .setTimeBreakpoints(mockTimeBreakpoints)
      .setCallback((tab: DateInfo[]) => tab.map(date => date.value));

    const result = dateProcessor.execute();
    const expectResult = [
      ['A', 'B', 'C'],
      ['A', 'B', 'C', 'D', 'E'],
      ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
    ]

    expect(result).toEqual(expectResult);
  });

  it('should return list empty list if no dates are set', () => {
    const mockTimeBreakpoints = [7, 14, 30];

    const dateProcessor = new DateProcessor()
    .setTimeBreakpoints(mockTimeBreakpoints)
    .setCallback((tab: DateInfo[]) => tab.map(date => date.value));

    const result = dateProcessor.execute();

    expect(result).toEqual([[], [], []]);
  });

  it('should return all date to first index array if no time breakpoints are set', () => {
    const today = new Date();
    const mockDate = [
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), value: 'A'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), value: 'B'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 'C'},

      // < 14
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8), value: 'D'},
      {date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9), value: 'E'},
    ]

    const dateProcessor = new DateProcessor()
    .setDates(mockDate)
    .setCallback((tab: DateInfo[]) => tab.map(date => date.value));

    const result = dateProcessor.execute();

    expect(result).toEqual([ ['A', 'B', 'C', 'D', 'E'] ]);
  });

  it('should set the relative date', () => {
    const mockDates: DateInfo[] = [
      { date: new Date('2023-05-09'), value: 'A' },
      { date: new Date('2023-05-08'), value: 'B' },
      { date: new Date('2023-05-02'), value: 'C' },
      { date: new Date('2023-04-15'), value: 'D' },
    ];

    const mockRelativeDate = new Date('2023-05-10');

    const dateProcessor = new DateProcessor()
      .setDates(mockDates)
      .setTimeBreakpoints([7,14,30])
      .setCallback((tab: DateInfo[]) => tab.map(date => date.value))
      .setRelativeDate(mockRelativeDate);

    const result = dateProcessor.execute();

    expect(result).toEqual([['A', 'B'], ['A', 'B', 'C'], ['A', 'B', 'C', 'D']]);
  })
})