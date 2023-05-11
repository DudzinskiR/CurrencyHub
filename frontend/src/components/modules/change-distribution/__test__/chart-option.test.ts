import { getData, options } from '../chart-options';

describe('getData', () => {
  it('should return correct data for given input', () => {
    const data = [10, 20, 30];
    const labels = ['10', '20', '30']

    const expected = {
      labels,
      datasets: [
        {
          label: ``,
          data,
          backgroundColor: 'rgba(0, 129, 251, 0.8)',
        }
      ],
    };
    expect(getData(data, labels)).toEqual(expected);
  });

  it('should return value with %', () => {
    expect(options.plugins.tooltip.callbacks.label({raw: 5})).toEqual('5%')
  })

  it('should return value with % on y axis', () => {
    expect(options.scales.y.ticks.callback(5)).toEqual('5%')
  })
})