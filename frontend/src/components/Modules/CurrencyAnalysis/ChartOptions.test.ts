import { getData, labels } from './ChartOptions';

describe('getData', () => {
  it('should return correct data for given input', () => {
    const data = [10, 20, 30];
    const expected = {
      labels,
      datasets: [
        {
          label: ``,
          data,
          backgroundColor: ['#FA4E4E', '#4EB3FF', '#1DC14E'],
        }
      ],
    };
    expect(getData(data)).toEqual(expected);
  });
})